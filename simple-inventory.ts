//%block="SimpleInventory"
//%block.loc.zh-CN="装备/物品"
//% weight=100 color=#F3A21C
namespace pxt_inventory {

    class Item {
        name: string
        img: Image
        amount: number

        constructor(name: string, img: Image, amount: number) {
            this.name = name
            this.img = img
            this.amount = amount
        }
    }

    const EMPTY_HANDED = new Item("EMPTY_HANDED_INTERNAL_USAGE", img`.`, 1)
    let items: Item[] = [EMPTY_HANDED]
    let currentItemIndex = 0

    const iconSprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `)

    //% block
    //% amount.defl=1
    //% blockid=pxt_inventory_add_item block="增加道具 %name 图标 %img=screen_image_picker  || 数量 $amount"
    export function addItem(name: string, img: Image, amount: number = 1) {
        let oldItem = items.find((value: Item) => {
            return value.name == name
        })

        if (oldItem != undefined) {
            oldItem.amount += amount
        } else {
            let item = new Item(name, img, amount)
            items.push(item)
            currentItemIndex = items.length - 1
        }

        update()
    }


    //% block
    //% amount.defl=1
    //% blockid=pxt_inventory_remove_item block="移除道具 %name || 数量 $amount"
    export function removeItem(name:string, amount:number = 1) {

        let itemToBeRemoved = items.find((value: Item, index: number) => {
            return name == value.name
        })
        if (itemToBeRemoved != undefined) {
            if (itemToBeRemoved.amount == 1) {
                items.removeElement(itemToBeRemoved)
            } else {
                itemToBeRemoved.amount -= amount
            }
            update()
        }
    }

    //% block
    //% blockid=pxt_inventory_remove_all_item_of block="移除全部的 %name 道具"
    export function removeAllItemOf(name: string) {

        let itemToBeRemoved = items.find((value: Item, index: number) => {
            return name == value.name
        })
        if (itemToBeRemoved != undefined) {
            items.removeElement(itemToBeRemoved)
            update()
        }
    }


    //% block
    //% blockid=pxt_inventory_item_amount block="道具 %name 的数量"
    export function itemAmount(name: string): number {
        let item = items.find((value: Item) => value.name == name)
        if (item == undefined) {
            return 0
        } else {
            return item.amount
        }
    }


    //% block
    //% blockid=pxt_inventory_current_item block="当前拿着的道具"
    export function currentItem(): string {
        let currentItem = items[currentItemIndex]
        if (currentItem == undefined) {
            return ""
        } else {
            return currentItem.name
        }
    }

    //% block
    //% blockid=pxt_inventory_is_empty_handed block="当前空手吗？"
    export function isEmptyHanded(): boolean {
        let currentItem = items[currentItemIndex]
        return currentItem == EMPTY_HANDED
    }

    //% block
    //% blockid=pxt_inventory_next_item_in_inventory block="切换到下一个道具"
    export function nextItemInInventory() {
        currentItemIndex += 1
        if (currentItemIndex >= items.length) {
            currentItemIndex = 0
        }
        update()
    }

    function update() {
        let iconImage = image.create(16, 16)
        iconImage.fillRect(0, 0, 16, 16, 1)

        let currentItem = items[currentItemIndex]
        if (currentItem != undefined) {
            iconImage.drawTransparentImage(currentItem.img, 0, 0)
            iconImage.print("" + currentItem.amount, 2, 2, 1, image.font8)
        }

        iconImage.drawRect(0, 0, 16, 16, 3)
        iconSprite.setImage(iconImage)
        iconSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        iconSprite.x = 12
        iconSprite.y = 108
        iconSprite.z = scene.HUD_Z
    }

    //% block
    //% blockid=pxt_inventory_toggle_toolbar block="显示道具条 %show"
    export function toggleToolbar(show: boolean) {
        iconSprite.setFlag(SpriteFlag.Invisible, show)
    }

}
