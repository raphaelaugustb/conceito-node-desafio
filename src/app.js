const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const project = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(project)
  return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  
  const repositoriesIndex = repositories.findIndex(repositories => repositories.id === id)
  if(repositoriesIndex < 0){
   response.status(400).json({ error:"Project not Found" })
  }   
   
  const project = {
    id,
    title,
    url,
    techs,
    likes:0,
   }
   
   repositories[repositoriesIndex] = project
   return response.json(project)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const project = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0,
  }
  const repositoriesIndex = repositories.findIndex(repositories => repositories.id === id)
  if(repositoriesIndex < 0){
    return response.status(404).json({ error:"Project not Found" })
  }else{
  repositories.splice(repositoriesIndex,1)
  }
  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const repositoriesSearch = repositories.find(repositories => repositories.id === id)
  if(!repositoriesSearch){
   response.status(400).json({ error:"Project not Found" })
  }   
  repositoriesSearch.likes += 1
  
  return response.json(repositoriesSearch)
 
});

module.exports = app;
