const { graphql, buildSchema } = require('graphql');

// graphQL按需加载数据
async function getDataGraphQL() {
    // 数据池
    const root = require('./girls.json');

    // schema
    const schema = buildSchema(`
        type Wheel {
            name: String,
            money: String
        }
        type Info {
            id: Int
            name: String
            iphone: Int
            weixin: String
            height: Int
            school: String
            wheel: [Wheel]
        }
        type Query {
            girls: [Info]
        }
    `);

    const query = `
        { 
            girls {
                name
                wheel {
                    money
                }
            }
        }
    `;

    // 查询
    const resData = await graphql(schema, query, root);
    console.log('按需加载后的数据', JSON.stringify(resData));
    return resData;
}

getDataGraphQL();