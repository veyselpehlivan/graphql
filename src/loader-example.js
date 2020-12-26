const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");
const DataLoader = require("dataloader");

const resolvers = {
    Query: {
        getStudent: () => {
            return fetch('http://localhost:8080/student').then(function (response) {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject(response)
                }
            })
        },

        getStudentById: (parent, args) => {
            const { id } = args

            return fetch(`http://localhost:8080/student/${id}`).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
        },

        getClassroomByIds: (parent, args) => {
            const dto = {
                ids: args.ids
            }
            return fetch(`http://localhost:8081/classroom/find-by-ids`,
                { method: 'POST', body: JSON.stringify(dto), headers: { 'Content-Type': 'application/json' } }
            ).then(res => res.json())
        },

        getClassroom: () => fetch(`http://localhost:8081/classroom`).then(res => res.json()),
    },

    Student: {
        id: (student, _args) => student.id,
        classroom: (student, _args, { loader }) => {
            console.log(student.classroomId);
            //return fetch(`http://localhost:8081/classroom/${student.classroomId}`).then(res => res.json())
            return loader.classrooms.load(student.classroomId);
        }
    },

    Mutation: {
        createStudent: (parent, args) => {
            const student = {
                id: args.id,
                name: args.name,
                age: args.age,
                email: args.email,
                classroomId: args.classroomId
            }

            console.log(student);
            return fetch('http://localhost:8080/student', {
                method: 'POST', body: JSON.stringify(student), headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
        },

        createClassroom: (parent, args) => {
            const classroom = {
                id: args.id,
                name: args.name,
                code: args.code
            }

            return fetch('http://localhost:8081/classroom', {
                method: 'POST', body: JSON.stringify(classroom), headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json())
        },

        deleteStudent: (parent, args) => {
            const { id } = args
            console.log(id);
            return fetch(`http://localhost:8080/student/${id}`, { method: 'DELETE' }).then(res => res.json())
        },

        deleteClassroom: (parent, args) => {
            const { id } = args
            console.log(id);
            return fetch(`http://localhost:8081/classroom/${id}`, { method: 'DELETE' }).then(res => res.json())
        },
    },
};

const loader = {
    classrooms: new DataLoader(async ids => {
        const dto = {
            ids: ids
        }
        const rows = await fetch(`http://localhost:8081/classroom/find-by-ids`,
            { method: 'POST', body: JSON.stringify(dto), headers: { 'Content-Type': 'application/json' } }
        ).then(res => res.json())

        const lookup = rows.reduce((acc, row) => {
            acc[row.id] = row;
            return acc;
        }, {});

        console.log(lookup);

        return ids.map(id => lookup[id] || null);
    })
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: () => {
        return { loader };
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );