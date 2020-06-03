import awaitjs from '@awaitjs/express'
import list from './users/list/index.js'
const router = awaitjs.Router()

router.postAsync('/users/list', list)

export default router
