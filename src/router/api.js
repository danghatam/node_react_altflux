/**========================================
 * Packages
 ========================================**/
import _ from 'lodash';
import chance from 'chance';
import { Router } from 'express';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import validator from 'validator';
import moment from 'moment';

/**========================================
 * Utilities
 ========================================**/
// import e from 'qanvast-error';

/**========================================
 * Generate random users
 ========================================**/
const generator = chance();
const MAX_USERS = 1000;
const usersArray = [];
const MAX_FEEDS = 100;
const feedsArray = [];
const MAX_ARTICLES = 100;
const sampleArticle = {
    "id": 1,
    "createdAt": "2014-10-30T05:08:50.026Z",
    "title": "6 Ways To Make Your Rooms Look Bigger",
    "description": "Like money, we will never complain that there's too much (room) space at home, and these local homes that have found ways to make rooms look bigger at pocket-friendly prices.",
    "categories": [
        "Guide"
    ],
    "prettyUrl": "6-ways-to-make-your-rooms-look-bigger",
    "isFeatured": true,
    "publishAt": null,
    "isPublished": true,
    "lang": "en",
    "regions": [
        "SG"
    ],
    "markdown": "Space is a form of luxury on our densely-populated sunny island. With shrinking square feet in new homes, we take a look at how these HDBs and condominiums effectively incorporate design, colours and nature to make a small space seemingly larger at pocket-friendly prices.\n\n\n**1. Natural Light**\n\nLet natural light seep in to create depth. Take a step further and replace the curtains with blinds or shades if you need privacy.  \n\n![d-home-trevista-living-room](https://api.qanvast.com/image/600/standard-nofill)\n\nID: [DHOME STUDIO](https://www.facebook.com/2dhomestudio)\nLocation: Toa Payoh (Condo)\nCost of renovation for entire house: $40,000\n\n![designer-guy-group-lowerdelta-livingroom](https://api.qanvast.com/image/593/standard-nofill)\n\n![designer-guy-group-lowerdelta-living-room](https://api.qanvast.com/image/594/standard-nofill)\n\nID: [Designer Guy Group](http://www.designerguygroup.com.sg)\nLocation: Lower Delta Road\nCost of renovation for entire house: $78,000\n\nIf your house isn’t blessed with a good layout in capturing solar energy, opt for glass partition to allow light to permeate and light up the darker corners of the room.\n\n![Mofasis-shunfu-road-study](https://api.qanvast.com/image/596/standard-nofill)\n\nID: [Mofasis](http://www.mofasis.com)\nLocation: Shunfu Road\nCost of renovation for entire house: $90,000\n\n![FSI-Bishan-Livingroom](https://api.qanvast.com/image/584/standard-nofill)\n\nID: [FSI](http://www.fsi.com.sg)\nLocation: Bishan (HDB)\nCost of renovation for entire house: $95,000\n\n\n**2. Mirrors**\n\nA common method is to make use of mirrors and other reflective surfaces to create the illusion of a bigger space. Opt for large full-length mirrors or position smaller mirrors opposite windows or in front of a light source to amplify the lighting. \n\n![d-home-cloverbythepark-living-room](https://api.qanvast.com/image/598/standard-nofill)\n\nID: [DHOME STUDIO](https://www.facebook.com/2dhomestudio)\nLocation: Bishan (Condo)\nCost of renovation for entire house: $50,000\n\n![Dezzo-KimTian-LivingRoom](https://api.qanvast.com/image/591/standard-nofill)\n\nID: [Dezzo](http://dezzo.com)\nLocation: Kim Tian\nCost of renovation for entire house: $36,000\n\n\n**3. Trade overhead lights for smaller lamps**\n \nTop-down lighting can be harsh and draws attention to one space. Instead, set up smaller lamps at different corners of the house to spread light around the area and draw the eye around the room. Then select warm lightings to add on to the cosy factor.\n\n![BoonSiew-Dsign-Bedroom](https://api.qanvast.com/image/597/standard-nofill)\n\nID: [Boon Siew D'sign](http://boonsiewdesign.com)\nLocation: Tampines\nCost of renovation for entire house: $37,000\n\n![Space-Sense-East--Coast-Living-Room](https://api.qanvast.com/image/586/standard-nofill)\n\nID: [Space Sense Studio](http://spacesensestudio.com)\nLocation: East Coast (Condo)\nCost of renovation for entire house: $130,000\n\n\n**4. Show some legs**\n\n...for your furniture that is. As boundaries between rooms blur, reduce the chunk by choosing less bulky furniture with their sleek legs and contoured body.\n\n![dezzo-telokblangah-hall](https://qanvast-api.s3.amazonaws.com/ware/standard/dce3109f-fb1d-4aa7-aaf3-2a47c96f3f8d.jpg)\n\nID: [Dezzo](http://dezzo.com)\nLocation: Telok Blangah\nCost of renovation for entire house: $17,000\n\n![Space-Matters-BoonKeng-Living-Room](https://api.qanvast.com/image/595/standard-nofill)\n\nID: Space Matters\nLocation: Boon Keng\nCost of renovation for entire house: $190,000\n\n\n**5. Get rid of clutter**\n\nClutter is the nemesis of space. Minimise the sight of clutter with multi-purpose furniture or hidden storage display; or try disposing off your unused items for a cheaper alternative.\n\n![ZLC-prive-bedroom](https://api.qanvast.com/image/592/standard-nofill)\n\n![ZLC-prive-bedroom-storage](https://api.qanvast.com/image/583/standard-nofill)\n\nID: [Z L Construction](http://www.zlconstruction.com.sg)\nLocation: Punggol (Condo)\nCost of renovation for entire house: $25,000\n\n\n![DesignPractice-SeaBreeze-study](https://api.qanvast.com/image/589/standard-nofill)\n\n![DesignPractice-SeaBreeze_bedroom](https://api.qanvast.com/image/588/standard-nofill)\n\nID: [The Design Practice](http://thedesignpractice.sg)\nLocation: Joo Chiat (Condo)\nCost of renovation for entire house: $85,000\n\n\n**6. Light-coloured walls and floorings**\n\nA no-brainer; light-coloured floorings and walls are common ways to make the room feel airy as opposed to dark colours. If pristine white isn’t your preferred choice of palette, add a dash of colours in your furniture or try pale-coloured wallpapers or tiles. \n\n![Idees-Interior-UpperBoonKeng-Kitchen](https://api.qanvast.com/image/587/standard-nofill)\n\n![Idees-Interior-UpperBoonKeng-Livingroom](https://api.qanvast.com/image/590/standard-nofill)\n\nID: [Idees Interior Design](http://www.idees-interior.com.sg)\nLocation: Upper Boon Keng\nCost of renovation for entire house: $55,000\n\n\n![WallSociety-VanGogh](https://api.qanvast.com/image/581/standard-nofill)\n\n![WallSociety-Swaroski](https://api.qanvast.com/image/582/standard-nofill)\n\nProduct Merchant: [The Wall Society](https://www.facebook.com/thewallsociety)\nCost: Wallpaper costs $49/roll, excluding installation and delivery\n\n\n![RICe-Marvel-CALACATTA](https://api.qanvast.com/image/599/standard-nofill)\n\n![RICe-Marvel-MOON-ONYX](https://api.qanvast.com/image/601/standard-nofill)\n\nProduct Merchant: [RICE](http://www.rice-fields.com)\nCost: Price upon enquiry\n\n\nAre you looking forward to creating more space in your abode? Download the app for more ideas and connect with our home experts to help you create your dream (and spacious) home!",
    "resourceType": "Article",
    "deeplink": "qanvast://article/1",
    "images": {
        "Cover": {
            "id": 2896,
            "types": [
                "Gallery",
                "Cover",
                "Featurette"
            ]
        }
    },
    "metadata": {
        "title": "6 Ways To Make Your Rooms Look Bigger",
        "description": "Make a small space seemingly larger at pocket-friendly prices."
    }
};

for (let i = 0; i <= MAX_USERS; i++) {
    usersArray.push({
        id: i,
        name: generator.name(),
        gender: generator.gender(),
        birthday: generator.birthday(),
        address: {
            line1: generator.address(),
            line2: generator.city()
        }
    });
}

// Generate random feeds data (doesnt follow the model, only has some neccessary fields)
// TO-DO: update BannerWidget, ArticleWidget, ProjectWidget to use the right modelled fields
// after intergrating real api
for (let i = 0; i <= MAX_FEEDS; i++) {
    const bgColor = generator.color({ format: 'hex' }).substring(1);
    const txtColor = generator.color({ format: 'hex' }).substring(1);
    const rd = {
        id: i,
        type: generator.natural({ min: 1, max: 3 }),
        title: generator.sentence({ words: generator.natural({ min: 1, max: 5 }) }),
        description: generator.sentence(),
        img: `http://placehold.it/1000x400/${bgColor}/${txtColor}/?text=Placehold.it`
    };
    if (rd.type === 1) {
        rd.category = generator.word();
    }
    if (rd.type === 3) {
        rd.price = generator.natural({ min: 200000, max: 1000000 });
    }
    feedsArray.push(rd);
}

const MAX_COMPANIES = 100;
const companiesArray = [];
const categories = [
    "Product Merchants",
    "Interior Designers",
    "Architects",
    "Maybank",
    "M1 Promotion"
]
for (let i = 0; i < MAX_COMPANIES; i++) {
    companiesArray.push({
        "id": i,
        "name": generator.name(),
        "description": generator.string(),
        "email": generator.email(),
        "phone": generator.phone(),
        "canReceiveSMS": true,
        "address": generator.address(),
        "categories": [
            categories[i%5]
        ]     
    })
}

const api = Router(); // eslint-disable-line new-cap

api.use(bodyParser.json());

api.get('/users', (req, res) => {
    const perPageCount = (req.query.per_page_count == null || req.query.per_page_count < 1) ? 10 :
                        parseInt(req.query.per_page_count, 10);

    const page = (req.query.page == null || req.query.page < 0) ? 1 : parseInt(req.query.page, 10);

    const startIndex = (page - 1) * perPageCount;
    const endIndex = startIndex + perPageCount;
    let users = _.slice(usersArray, startIndex, endIndex);

    users = users.map(user => {
        /**
         * TODO: Odd numbered users will contain the whole object,
         * TODO: while even numbered users will only contain ID and name.
         * TODO: Remove this if you're not trying to learn React.
         */
        if (user.id % 2 === 1) {
            return user;
        }

        return { id: user.id, name: user.name };
    });

    const response = {
        page,
        totalCount: MAX_USERS,
        perPageCount,
        data: users
    };

    res.json(response);
});

// Mock a simple OAuth2.0 Bearer token check.
api.get('/user/:id', (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            // Fits the format we're looking for, so OK! NEXT!
            if (/^Bearer$/i.test(scheme)
                && validator.isUUID(credentials, '4')) {
                return next();
            }
        }
    }

    res.sendStatus(401); // Unauthorized.
}, (req, res) => {
    const id = req.params.id;

    if (id == null || usersArray.length <= id) {
        res.status(500).send({ error: 'Invalid user' });
    } else {
        res.json(usersArray[id]);
    }
});

// We're emulating a oauth2 connect/authentication flow here, will always return User 1
api.post(/^\/authentication\/(connect\/[a-z0-9]+(?:-[a-z0-9]+)?|register|reset-password)\/?$/i,
    (req, res) => {
        if (req.body.email && req.body.password) {
            const expiryDate = moment().add(1, 'hours');

            res.json({
                user: usersArray[1],
                tokens: {
                    token: uuid.v4(),
                    expiry: expiryDate,
                    refreshToken: uuid.v4()
                }
            });
        } else {
            res.status(500).send({ error: 'Wrong email and password' });
        }
    });

// We're emulating a oauth2 refresh flow here
api.post('/oauth2/token/refresh', (req, res) => {
    if (req.body && req.body.refreshToken && req.body.userId
        && validator.isUUID(req.body.refreshToken, '4')) {
        res.json({
            tokens: {
                token: uuid.v4(),
                expiry: moment().add(1, 'hours'),
                refreshToken: uuid.v4()
            }
        });
    } else {
        res.status(400).send({ error: 'Missing refresh token' });
    }
});

// Mock feed discover
api.get('/feed/discover', (req, res) => {
    const perPageCount = (req.query.perPageCount == null || req.query.perPageCount < 1) ? 14 :
        parseInt(req.query.perPageCount, 10);

    const page = (req.query.page == null || req.query.page < 0) ? 1 : parseInt(req.query.page, 10);

    const startIndex = (page - 1) * perPageCount;
    const endIndex = startIndex + perPageCount;
    const feeds = _.slice(feedsArray, startIndex, endIndex);


    const response = {
        page,
        totalCount: MAX_FEEDS,
        perPageCount,
        data: feeds
    };

    res.json(response);
});

// Mock article
api.get('/articles', (req, res) => {
    const perPageCount = (req.query.per_page_count == null || req.query.per_page_count < 1) ? 10 :
        parseInt(req.query.per_page_count, 10);

    const page = (req.query.page == null || req.query.page < 0) ? 1 : parseInt(req.query.page, 10);

    let startIndex = (page - 1) * perPageCount;
    if (startIndex >= MAX_ARTICLES) startIndex = MAX_ARTICLES - 1;
    let endIndex = startIndex + perPageCount;
    if (endIndex >= MAX_ARTICLES) endIndex = MAX_ARTICLES - 1;

    let data = [];
    for (let i = startIndex; i < endIndex; i++) {
        sampleArticle.id = i;
        data.push(sampleArticle);
    }

    const response = {
        page,
        totalCount: MAX_ARTICLES,
        perPageCount,
        data: data
    };

    res.json(response);
});

api.get('/article/:id', (req, res) => {
    const id = req.params.id;

    if (id == null || MAX_ARTICLES <= id) {
        res.status(500).send({ error: 'Invalid article' });
    }

    sampleArticle.id = id;

    res.json(sampleArticle);
});

api.get('/companies', (req, res) => {
    const perPageCount = (req.query.perPageCount == null || req.query.perPageCount < 1) ? 14 :
        parseInt(req.query.perPageCount, 10);

    const page = (req.query.page == null || req.query.page < 0) ? 1 : parseInt(req.query.page, 10);

    const startIndex = (page - 1) * perPageCount;
    const endIndex = startIndex + perPageCount;
    const companies = _.slice(companiesArray, startIndex, endIndex);


    const response = {
        page,
        totalCount: MAX_FEEDS,
        perPageCount,
        data: companies
    };

    res.json(response);
});

api.get('/company/:id', (req, res) => {
    const id = req.params.id;
    if(id == null || MAX_COMPANIES <= id){
        res.status(500).send({ error: 'Invalid company' });
    }
    res.json(companiesArray[id]);
});

export default api;
