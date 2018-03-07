const
    request = require('supertest'),
    app = require('../app');

describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200);
        });

        // it('#test Post /signup', async () => {
        //     let res = await request(server)
        //         .post('/signup')
        //         .field('username', 'xinsong')
        //         .field('password', 'password')
        //         .set('Accept', 'application/json')
        //         .expect(200);
        // });
    });
});