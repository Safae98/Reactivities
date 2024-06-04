import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";

interface Props { 
    activities : Activity[];
    selectedActivity :Activity | undefined;
    selectActivity :(id : string) => void ;
    CancelSelectActivity :() => void
    editMode : boolean ;
    openForm : (id : string ) => void;
    closeForm :() => void ;
    CreateOrEdit :(activity :Activity)  => void;
    deleteActivity : (id : string) => void ;
}



export  default function ActivityDashboard({activities ,selectedActivity ,deleteActivity, selectActivity ,CancelSelectActivity,editMode ,openForm,closeForm , CreateOrEdit} : Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                deleteActivity ={deleteActivity}
                activities = {activities} 
                selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity}  
                CancelSelectActivity={CancelSelectActivity}
                openForm ={openForm}/>}
                {editMode && 
                <ActivityForm closeForm ={closeForm} activity={selectedActivity} CreateOrEdit={CreateOrEdit}/>}
            </Grid.Column>

        </Grid>
  

    )

}