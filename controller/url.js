import shortid from 'shortid';
import { nanoid } from 'nanoid'
import db from '../modles/url.js'

async function shortUrl(req, res) {
    const body = req.body;
    console.log(body.url)
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortID = nanoid(8);
    console.log(req.user._id)
    await db.URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy : req.user._id

    })

    return res.render('home',{
        id : shortID
    })
}


// async function redirectHandler(req, res) {
//     const shortId = req.params.shortID;

//     const entry = await db.URL.findOneAndUpdate(
//         {
//             shortId
//         },
//         {
//             $push: {
//                 visitHistory: {
//                     timestamp: Date.now()
//                 }
//             }
//         })
//     console.log(entry)
//     res.redirect(entry.redirectURL)
// }
async function redirectHandler(req, res) {
    const shortId = req.params.shortID;

    try {
        const entry = await db.URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        // Check if entry exists
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        // Redirect to the original URL
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error in redirect:', error);
        res.status(500).send('Server error');
    }
}


async function analysticHandler(req, res) {
    const shortId = req.params.shortID;
    const result = await db.URL.findOne({ shortId });

    return res.json({ totalClick: result.visitHistory.length, analystic: result.visitHistory })
}

export default {
    shortUrl,
    redirectHandler,
    analysticHandler
}