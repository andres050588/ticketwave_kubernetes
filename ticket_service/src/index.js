import express from "express"
import sequelize from "./config/db.js"
import Ticket from "./models/ticketModel.js"
import cors from "cors"
import routerTicket from "./routes/ticketRoutes.js"
import "./events/subscriber.js"

const app = express()

// Middleware
const whiteList = ["http://localhost:8080", "https://ticketwave-kubernetes.vercel.app"]

app.use(
    cors({
        origin: function (origin, callback) {
            // Per richieste senza origin (Postman)
            if (!origin) return callback(null, true)
            if (whiteList.indexOf(origin) === -1) {
                const msg = "CORS policy: Origine non autorizzata."
                return callback(new Error(msg), false)
            }
            return callback(null, true)
        },
        credentials: true
    })
)
app.options(
    "*",
    cors({
        origin: whiteList,
        credentials: true
    })
)
app.use(express.json())

// Routes
app.use("/api", routerTicket)

// Connessione DB + avvio server
async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("Connessione al database ticket_service riuscita!!")
        await sequelize.sync() // aggiungo { force: true } se voglio ressetare i dati nella db

        const PORT = process.env.PORT || 3002
        app.listen(PORT, () => {
            console.log(`Ticket service listening on port ${PORT}`)
        })
    } catch (error) {
        console.error("Errore nella connessione al DB:", error)
    }
}

startServer()
