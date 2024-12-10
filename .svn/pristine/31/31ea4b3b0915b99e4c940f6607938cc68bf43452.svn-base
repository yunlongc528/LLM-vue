import { addUser } from '@/api/pos'
import { defineStore } from 'pinia'
export const useUserOrderCardList = defineStore('userOrderCardList', {
    state: () => {
        return {
            userOrder: [
                // {
                //     id: 1,
                //     name: 'Item 1',
                //     old: '31',
                //     weight: '73kg',
                //     Kilometer: '6.27',
                //     isSignatures: true,
                //     AdultBestTime: '08:00',
                //     JuniorBestTime: '08:00',
                //     totalVouchersNum: 7,
                //     imageUrl:
                //         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                //     note: {},
                //     personTotalmoney: 0,
                //     productList: [
                //         {
                //             productName: '酒',
                //             productSinglePrice: 226.0,
                //             productId: 1,
                //             productNum: 1,
                //             productTotal: 0,
                //             depotProdcutNum: 10,
                //             productCategory: 'karting',
                //             productimageSrc: '/public/bar.png',
                //         },
                //     ],
                // },
                // {
                //     id: 2,
                //     name: 'Item 2',
                //     old: '31',
                //     weight: '',
                //     Kilometer: '6.27',
                //     isSignatures: false,
                //     AdultBestTime: '08:00',
                //     JuniorBestTime: '08:00',
                //     imageUrl:
                //         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                //     totalVouchersNum: 0,
                //     note: {
                //         content: '笔记内容123123',
                //         time: '2022-02-02',
                //     },
                //     personTotalmoney: 0,
                //     productList: [
                //         {
                //             productName: '酒',
                //             productSinglePrice: 226.0,
                //             productId: 2,
                //             productNum: 1,
                //             productTotal: 0,
                //             depotProdcutNum: 10,
                //             productCategory: 'karting',
                //             productimageSrc: '/public/bar.png',
                //         },
                //         {
                //             productName: '酒',
                //             productSinglePrice: 226.0,
                //             productId: 3,
                //             productNum: 1,
                //             productTotal: 0,
                //             depotProdcutNum: 14,
                //             productCategory: 'karting',
                //             productimageSrc: '/public/bar.png',
                //         },
                //     ],
                // },
            ],
            chosePurchased: false,
            //作为中间件temp使用，同来存储dialog中当前的商品信息
            orderInfo: {},
            allTotal: 0,
        }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        addUser(use) {
            this.userOrder.push(use)
        },
        cpmputedallTotal() {
            let all = 0
            for (let i = 0; i < this.userOrder.length; i++) {
                all += this.userOrder[i].personTotalmoney
            }
            this.allTotal = all
        },
        updataPersonalTotal(userid: number, personTotalmoney: number) {
            this.userOrder.forEach((item) => {
                if (item.id === userid) {
                    item.personTotalmoney = personTotalmoney
                }
            })
        },
        changeDialog(val: boolean) {
            this.chosePurchased = val
        },
        addOrderInfo(product) {
            this.orderInfo = product
        },
        clearOrderInfo() {
            this.orderInfo = {}
        },
        deleteUser(itemId) {
            this.userOrder = this.userOrder.filter((item) => item.id !== itemId)
        },
        addproductList(id) {
            this.userOrder.forEach((item) => {
                if (item.id === id) {
                    item.productList.push(this.orderInfo)
                }
            })
        },
        deleteproduct(userid, productId) {
            this.userOrder.forEach((item) => {
                if (item.id === userid) {
                    item.productList = item.productList.filter(
                        (product) => product.productId !== productId,
                    )
                    console.log(item.productList)
                }
            })
        },
    },
    getters: {
        totalPrices: (state) => {
            return state.userOrder.map((order) => {
                return {
                    orderId: order.id,
                    totalPrice: order.productList.reduce((total, product) => {
                        return total + product.productTotal // 累加每个产品的总价
                    }, 0),
                }
            })
        },
    },
})
