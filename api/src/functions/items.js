const { app } = require('@azure/functions');
const sql = require('mssql');


const config = {
    user: 'appuser',
    password: 'Arcera@2026_2_Apps',
    server: 'ZAS0019',
    database: 'Acino_CE_Prod',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};


function corsResponse(body) {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        jsonBody: body
    };x
}

app.http('items', {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    authLevel: 'anonymous',

    handler: async (request) => {

        if (request.method === 'OPTIONS') {
            return corsResponse({});
        }

        await sql.connect(config);

        // ✅ GET
        if (request.method === 'GET') {
            const result = await sql.query`SELECT IDNUM, ITEMNAME FROM Items`;

            // ✅ Map DB → clean API
            const data = result.recordset.map(r => ({
                id: r.IDNUM,
                name: r.ITEMNAME
            }));

            return corsResponse(data);
        }

        // ✅ POST
        if (request.method === 'POST') {
            const body = await request.json();
            const id = Date.now().toString();

            await sql.query`
                INSERT INTO Items (IDNUM, ITEMNAME)
                VALUES (${id}, ${body.name})
            `;

            return corsResponse({ id, name: body.name });
        }

        // ✅ PUT
        if (request.method === 'PUT') {
            const body = await request.json();

            await sql.query`
                UPDATE Items
                SET ITEMNAME = ${body.name}
                WHERE IDNUM = ${body.id}
            `;

            return corsResponse({ message: "Updated" });
        }

        // ✅ DELETE
        if (request.method === 'DELETE') {
            const id = request.query.get('id');

            await sql.query`
                DELETE FROM Items WHERE IDNUM = ${id}
            `;

            return corsResponse({ message: "Deleted" });
        }
    }
});