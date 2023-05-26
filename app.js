const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPago = addKeyword(['Pago'])
    .addAnswer([
        '✨Yape: 926457456',
        '✨Plin: 926457456',
        '\n 👉 Escribe *Inicio* para volver al menu principal'
    ],{ capture: true },
    (ctx, flow) => {
        if (ctx.body === 'Inicio') {
            flow.gotoFlow(flowPrincipal);
        }
    })



const flowLocal = addKeyword(['Local'])
    .addAnswer([
        '📍Estamos ubicados en Surquillo 1550 av.palmeras',
        '📍Google maps - https://goo.gl/maps/mQFBCDnJUixJFzce9',
        '\n 👉 Escribe *Inicio* para volver al menu principal'
    ],{ capture: true },
    (ctx, flow) => {
        if (ctx.body === 'Inicio') {
            flow.gotoFlow(flowPrincipal);
        }
    })


const flowRedes = addKeyword(['Redes'])
    .addAnswer([
        '✨Síguenos, no te pierdas de ninguna promo',
        '✨IG: @Restaurant.Mimi',
        '✨FB: Restaurant.Mimi',
        '✨TikTok: @Restaurant.Mimi',
        '\n 👉 Escribe *Inicio* para volver al menu principal'
    ],{ capture: true },
    (ctx, flow) => {
        if (ctx.body === 'Inicio') {
            flow.gotoFlow(flowPrincipal);
        }
    })






// const flowDelivery = addKeyword(['Delivery'])
// .addAnswer(['Para el registro de su pedido, indíquenos los siguientes datos:(usa la plantilla)'])
// .addAnswer(
//     'Nombres completos, direccion,numero',
//     {capture:true}, (ctx) => {
//     console.log('Mensaje entrante:' , ctx.body)
// })

// .addAnswer(
//     'Estás a un paso del registro, realiza el pago en cualquiera de las cuentas y envíanos tu voucher'
// )

const flowDelivery = addKeyword(['Delivery'])
    .addAnswer(['Para el *registro de su pedido*, indíquenos los siguientes datos:'])
    .addAnswer([
        'Nombres completos:',
        'Entrada y Segundo:',
        'Dirección:',
        'Celular:'
    ])
    .addAnswer(
        'Estás a un paso del registro, escribe *pago* y envíanos tu voucher', {
        delay: 10000,
        goTo: [flowPago]
    },

    )





const flowPlatos = addKeyword(['Platos'])
    .addAnswer('Conoce el menú de hoy')
    .addAnswer(
        [
            '*ENTRADAS* 🍜',
            'Sopa',
            'Tequeños',
            '*SEGUNDOS* 🍝',
            'Lomo Saltado',
            'Tallarines Rojos',
            
            
        ])


        .addAnswer([
            '👉 Escribe *Inicio* para volver al menu principal'
        ]
        , { capture: true },
        (ctx, flow) => {
            if (ctx.body === 'Inicio') {
                flow.gotoFlow(flowPrincipal);
            }
        })
        
        
    
    // .addAnswer(
    //     '👉 Escribe *Inicio* para volver al menú', {
    //     goTo: [flowPrincipal]

    // })



    
    


const flowPrincipal = addKeyword(['hola', 'Inicio'])
    .addAnswer('🙌 Hola bienvenid@, soy el chatbot del restaurante Mimi')
    .addAnswer(
        [
            '*__Menú__* 🏠',
            'Escribe una opción para poder ayudarte ',
            '👉 *Platos* de HOY!, para ver el menú',
            '👉 *Delivery* Flash!',
            '👉 *Local*, para ver nuestra ubicación',
            '👉 *Redes*, para ver nuestras promos',
        ],
        null,
        null,
        [flowPlatos, flowLocal, flowRedes,flowDelivery]
    );



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowPago])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
