import './CommentDriver.css'
import React, { useState, useRef } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popup from 'reactjs-popup';
import CloseButton from 'react-bootstrap/CloseButton'
import axios from 'axios';
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import getCookie from '../getCookie';
const labels = {
    // 0.5: 'Useless',
    1: 'ควรปรับปรุง',
    // 1.5: 'Poor',
    2: 'พอใช้',
    // 2.5: 'Ok',
    3: 'ดี',
    // 3.5: 'Good',
    4: 'ดีมาก',
    // 4.5: 'Excellent',
    5: 'สุดยอด',
  };
  
const useStyles = makeStyles({
root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    },
});


  


export default function CommentDriver(props){
    const [value, setValue] = useState(0);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const commentRef = useRef("");
    const fileRef = useRef(null);

    function sendReport(){
        let timeoutId = setInterval(()=>{
            axios.post(Url.LinkToBackend +"backend/api/reporting", {
                driver_id: props.driverId,
                JWT :`${getCookie('token')}`,
                rating: value,
                string_report: commentRef.current.value,
                booking_id: props.bookingId,
        
            }).then((res)=>{
                if(res.data.auth_code === false){
                    axios.post(Url.LinkToBackend+"backend/api/logout_user",{
                      username: localStorage.getItem("username")
                    }).then(()=>{
                      localStorage.clear();
                      localStorage.setItem("Auth","failed");
                      window.location.reload();
                    })
                }
                else{
                    clearInterval(timeoutId)
                    console.log(res.data);
                    props.handleForUpdate(null);
                    window.location.reload()
                  }
            }).catch(err=>{
                NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
            })
        },1000)
        
                // clearInterval(timeoutId);
        
            
            
        
        
        
    };
      
    return(
        <div className="comment-driver-container">
            <CloseButton id="close-butt" onClick={()=>{props.handleForUpdate(null);window.location.reload();}} />
            <div>   
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography id="commentH" component="legend">ให้คะแนน</Typography>
                    <Rating
                    name="simple-controlled"
                    value={value}
                    size='large'
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                    />
                    {value !== null && <Box id="rate-name" ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </Box>
                <textarea name="comments" id="comments" ref={commentRef}  placeholder="ความคิดเห็นเพิ่มเติม" />
                <form>
                {/* <TextField label="ความคิดเห็นเพิ่มเติม"  variant="filled" fullWidth /> */}

                </form>
                
            </div>
            
            <Popup trigger={<button type="button" class="btn btn-primary" id="done-button-com"> ยืนยัน </button>} modal nested>
            { 
              close=>(
                <div className="thankyou"> <h1>ยืนยันที่จะส่งข้อมูล</h1>
                    <button id="thank-button" onClick={sendReport}> ยืนยัน </button>

                </div>)
                
            }
            
            </Popup>

            
        </div>
    );
}



