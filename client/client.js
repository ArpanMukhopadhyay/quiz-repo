const axios = require('axios');

const url = 'http://localhost:3000/dummyJson';

const create = async (issue) => {
    let res = await axios.post(url, issue);
    console.log('Response: ', res.data);
};

const read = async () => {
    let res = await axios.get(url);
    console.log('Response: ', res.data);
}

const update = async(id, issue) => { 
    let res = await axios.put(`${url}/${id}`,issue);
    console.log('Response: ', res.data);
}

const del = async (id) => {
    let res = await axios.delete(`${url}/${id}`);
    console.log('Response: ', res.data);
}

(async () => {
    await create({ id: 1, title: 'dummy json title', description: 'dummy json description' });
    await read();
    await update(1, { title: 'Updated dummy json title', description: 'Updated dummy json description' });
    await del(1);
})();