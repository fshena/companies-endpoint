require('dotenv').config();

const chai             = require('chai');
const chaiHttp         = require('chai-http');
const models           = require('../../src/models/index');
const server           = require('../../devServer');
const companyMysqlRepo = require('../../src/repository/mysql/company-repository');
const should           = chai.should();
const assert           = chai.assert;

chai.use(chaiHttp);

const newCompany = {
    name: 'Gipeda Renti 2',
    description: '5x5, 7x7',
    telephone: '226767674358',
    email: 'gipeda.renti1@yahoo.com',
    logo: 'http://lorempixel.com/640/480/business',
    address: {
        street: 'Ondricka Squares',
        number: '99698',
        city: 'Port Coltonberg',
        country: 'Liberia',
    },
    location: {
        latitude: 39,
        longitude: -160,
    },
};

describe('Company', () => {
    beforeEach(async () => {
        await models.Company.sync({ force: true });
        await models.Company.create({
            name: 'Gipeda Renti',
            description: '5x5, 7x7',
            telephone: '2267676758',
            email: 'gipeda.renti@yahoo.com',
            logo: 'http://lorempixel.com/640/480/business',
            street: 'Ondricka Squares',
            number: '99698',
            city: 'Port Coltonberg',
            country: 'Liberia',
            latitude: 39,
            longitude: -160,
        });
    });
    describe('GET /companies', () => {
        it('should return an array of Company objects', (done) => {
            chai.request(server)
                .get('/companies')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1);
                    res.body[0].should.be.an('object');
                    done();
                });
        });
        it('should return an array of Company objects with fields: name, telephone', (done) => {
            chai.request(server)
                .get('/companies?fields=name,telephone')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.an('object').that.has.all.keys('name', 'telephone');
                    done();
                });
        });
        it('should return 400 when the requested fields are wrong', (done) => {
            chai.request(server)
                .get('/companies?fields=name,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe('GET /companies/:id', () => {
        it('should return a Company object', (done) => {
            chai.request(server)
                .get('/companies/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('should return a Company object with fields: id, address.street, address.number', (done) => {
            chai.request(server)
                .get('/companies/1?fields=id,address.street,address.number')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object').that.has.all.keys('id', 'address');
                    res.body.should.have.nested.property('address.street');
                    res.body.should.have.nested.property('address.number');
                    done();
                });
        });
        it('should return 400 when the requested fields are wrong', (done) => {
            chai.request(server)
                .get('/companies/1?fields=name,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe('POST /companies', () => {
        beforeEach(async () => {
            await models.Company.sync({ force: true });
        });
        it('should create a Company record and return its link', (done) => {
            chai.request(server)
                .post('/companies')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send(newCompany)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.header('content-location');
                    companyMysqlRepo
                        .getCompanyById({ companyId: 1 })
                        .then((company) => {
                            company.should.be.an('object');
                            done();
                        });
                });
        });
    });
    describe('PUT /companies/:id', () => {
        it('should replace a Company record with a new one', (done) => {
            chai.request(server)
                .put('/companies/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send({ name: 'updated_name' })
                .end((err, res) => {
                    res.should.have.status(204);
                    companyMysqlRepo
                        .getCompanyById({ companyId: 1 })
                        .then((company) => {
                            assert.equal(company.name, 'updated_name');
                            done();
                        });
                });
        });
    });
    describe('DELETE /companies/:id', () => {
        it('should delete a Company record', (done) => {
            chai.request(server)
                .delete('/companies/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(204);
                    companyMysqlRepo
                        .getCompanyById({ companyId: 1 })
                        .then((company) => {
                            assert.equal(company, null);
                            done();
                        });
                });
        });
    });
});
