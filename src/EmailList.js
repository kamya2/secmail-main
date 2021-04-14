import React, { useEffect, useState } from 'react';
import "./EmailList.css";
import Section from "./Section";
import {IconButton,Checkbox,Button} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import EmailRow from "./EmailRow";
import { db, getUserDetails } from './firebase';


function EmailList() {
    const [emails, setEmails]=useState([]);
    const [selectedState,setSelectedState]=useState(true);
    useEffect(() => {
        const email_id = getUserDetails().email;
        db.collection(email_id).doc('inbox').collection('all').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setEmails(snapshot.docs.map((
            doc => ({
                id: doc.id,
                data: doc.data()
            })
        ))));
    }, []);

    function changeEmailList(type){
        setSelectedState(!selectedState)
        if('per'){
            // fetch code for personal
        }else{
            // fetch code for professional
        }
        // Change the url in fetch
        // In the result function change the set state to setEmails(data)
      /* fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
            alert(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            alert(error)
        }
      )*/
    }
    
    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settings__left">
                    <Checkbox/>
                    <IconButton>
                        <ArrowDropDownIcon/>
                    </IconButton>
                    <IconButton>
                        <RedoIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
                <div className="emailList__settings__right">
                    <IconButton>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon/>
                    </IconButton>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="emailList__sections">
                <Button onClick={changeEmailList('per')}><Section Icon={InboxIcon} title="Personal" color="blue" selected={selectedState}  /></Button>
                <Button onClick={changeEmailList('pro')}><Section Icon={PeopleIcon} title="Professional" color="green" selected={!selectedState}/></Button>
                            </div>
            <div className="emailList__list">
                {emails.map(({ id, data: { from, subject, message, timestamp,image_url } }) => {
                    return (
                        <EmailRow
                            id={id}
                            key={id}
                            title={from}
                            subject={subject}
                            message={message}
                            time={new Date(timestamp?.seconds*1000 + 5.5*60*60).toLocaleString()}
                            img_url={image_url} />
                    );
                })}

            </div>
        </div>
    );
}

export default EmailList
