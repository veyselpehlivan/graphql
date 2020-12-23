const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const http = require('http');
const URL = require('url').URL;
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    
    getStudent: () => {
    let classroomIds = [];
    return fetch('http://localhost:8080/student').then(function(response){
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
    }).then(function(students) {
      for (student of students) {
        classroomIds.push(student.classroomId);
      }
      
      const dto = {
          ids: classroomIds
      }
      
    return fetch('http://localhost:8081/classroom/find-by-ids', 
        {method: 'POST',body: JSON.stringify(dto), headers: { 'Content-Type': 'application/json' }}).then(function(classrooms){

        if (classrooms.ok) {
          return classrooms.json()
        } else {
          return Promise.reject(classrooms)
        }
    }).then(function(classroomList) {

      console.log(classroomList);

      for (student of students) {
        for (classroom of classroomList){
          if(student.classroomId == classroom.id){
              student.classroom = classroom;
          }
        }
    }

    return students;
    });

    })

    },


    getClassroomByIds: (parent, args) => {
              const dto = {
                      ids: args.ids
                    }
                return fetch(`http://localhost:8081/classroom/find-by-ids`,
                    {method: 'POST',body: JSON.stringify(dto), headers: { 'Content-Type': 'application/json' }}
                ).then(res => res.json())
          },




    getClassroom: () => fetch(`http://localhost:8081/classroom`).then(res => res.json()),



    getStudentById: (parent, args) => {
      const { id } = args
      let post;

      // Call the API
      return fetch(`http://localhost:8080/student/${id}`).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
        }).then(function (data) {

        // Store the post data to a variable
        post = data;

        // Fetch another API
        return fetch(`http://localhost:8081/classroom/${data.classroomId}`);

        }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).then(function (userData) {
         post.classroom = userData;
         return post;
      }).catch(function (error) {
        console.warn(error);
      });

    },


    getClassroomById: (parent, args) => {
      const { id } = args
      console.log(id);
      return fetch(`http://localhost:8081/classroom/${id}`).then(res => res.json())
    },
    
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
      return fetch('http://localhost:8080/student', {method: 'POST',body: JSON.stringify(student), headers: { 'Content-Type': 'application/json' }
             }).then(res => res.json())
  },

  createClassroom: (parent, args) => {
      const classroom = {
        id: args.id,
        name: args.name,
        code: args.code
      }

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