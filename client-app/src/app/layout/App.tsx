import {  useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
    const [activities , setActivities] =useState<Activity[]>([]);
    const [selectedActivity , setSelectedActivity ] = useState<Activity | undefined>(undefined);
    const [editMode , setEditMode] = useState(false);
    const [loading , setLoading]=useState(true);
    const [submitting , setSubmitting]=useState(false);

    useEffect(() => {
       // pour lire depuis le lien (api)
        agent.Activities.list().then(response => {
          const activities : Activity[] =[ ] ;
          response.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            activities.push(activity)
          })
        setActivities(activities) //then enregistre le reultat dans response
        setLoading(false)
        })
    }, []);
    

   function handleSelectActivity(id :string){
     setSelectedActivity(activities.find(x => x.id === id))
   }

   function handleCancelActivity(){
    setSelectedActivity(undefined)
  }

  function handelFormOpen(id? :string){
     id ? handleSelectActivity(id) : handleCancelActivity();
     setEditMode(true)
  }

  function handelFormClose(){
    setEditMode(false)
 }


 function handleCreateOrEditActivity(activity : Activity){
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id),activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false)
    })
  }else{
    activity.id= uuid();
    agent.Activities.create(activity).then(() =>{
        setActivities([...activities ,activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
    })
  }
}

function handleDeleteActivity(id : string){
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
     setActivities([...activities.filter(x=> x.id !==id )])
     setSubmitting(false);
  })
}


if(loading) return <LoadingComponent content='Loading app'/>
  return (
    <> 
      <NavBar  openForm = {handelFormOpen} />
      <Container style={{marginTop :'7em' }}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity ={selectedActivity}
          selectActivity={handleSelectActivity}
          CancelSelectActivity={handleCancelActivity}
          editMode ={editMode}
          openForm ={handelFormOpen}
          closeForm = {handelFormClose}
          CreateOrEdit = {handleCreateOrEditActivity}
          deleteActivity ={handleDeleteActivity}
          submitting ={submitting}
          />
      </Container>
    </>
    
  )
}

export default App
