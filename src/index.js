const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const http = require('http');
const URL = require('url').URL;
const fetch = require("node-fetch");

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 1
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    
    getStudent: () => fetch(`http://localhost:8080/student`).then(res => res.json()),
    

    getClassroom: () => fetch(`http://localhost:8081/classroom`).then(res => res.json()),







    // getStudentById: (parent, args) => {
    //   const { id } = args
    //   console.log(id);
    //   return fetch(`http://localhost:8080/student/${id}`).then(res => res.json()).then(function(data){
    //     let classroom = fetch(`http://localhost:8081/classroom/${data.classroomId}`)

    //     console.log(classroom)

    //     let student = {
    //     id: data.id,
    //     name: data.name,
    //     age: data.age,
    //     email: data.email,
    //     classroom: classroom
    //     }

    //     console.log(student)
    //     return student
    //   })

      

    // },

    getStudentById: (parent, args) => {
      const { id } = args
      console.log(id);
      let responseStudent = fetch(`http://localhost:8080/student/${id}`).then(res => res.json()).then(function(data){
        return data;
      })

      console.log(responseStudent)
      // let classroom = fetch(`http://localhost:8081/classroom/${responseStudent.classroomId}`).then(res => res.json())

      // console.log(classroom)

      //   let student = {
      //   id: responseStudent.id,
      //   name: responseStudent.name,
      //   age: responseStudent.age,
      //   email: responseStudent.email,
      //   classroom: classroom
      //   }

      //   console.log(student)
      //   return student
      

      

    },









    getClassroomById: (parent, args) => {
      const { id } = args
      console.log(id);
      return fetch(`http://localhost:8081/classroom/${id}`).then(res => res.json())
    },
    
  },
  Mutation: {
    // 2
    // post: (parent, args) => {
    //    const link = {
    //     id: `link-${idCount++}`,
    //     description: args.description,
    //     url: args.url,
    //   }
    //   links.push(link)
    //   return link
    // },

  createStudent: (parent, args) => {
      const student = {
        id: args.id,
        name: args.name,
        age: args.age,
        email: args.email,
        classroomId: args.classroomId
      }

      console.log(student);
      return fetch('http://localhost:8080/student', {method: 'POST',body: JSON.stringify(student), headers: { 'Content-Type': 'application/json' }
             }).then(res => res.json())
  },

  createClassroom: (parent, args) => {
      const classroom = {
        id: args.id,
        name: args.name,
        code: args.code
      }

      console.log(student);
      return fetch('http://localhost:8081/classroom', {method: 'POST',body: JSON.stringify(classroom), headers: { 'Content-Type': 'application/json' }
             }).then(res => res.json())
  },

  deleteStudent: (parent, args) => {
      const { id } = args
      console.log(id);
      return fetch(`http://localhost:8080/student/${id}`,{method: 'DELETE'}).then(res => res.json())
    },

  deleteClassroom: (parent, args) => {
      const { id } = args
      console.log(id);
      return fetch(`http://localhost:8081/classroom/${id}`,{method: 'DELETE'}).then(res => res.json())
    },
  },
}

// function sendRequestToStudentService() {
//   let options = new URL("http://localhost:8080/student")

//  http.get(options, (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(data);
//     return JSON.parse(data);

//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });
// }


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );