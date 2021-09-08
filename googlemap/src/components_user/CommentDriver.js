import './CommentDriver.css'
import React, { useState, useRef } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popup from 'reactjs-popup';
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
    return(
        <div className="comment-driver-container">
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
                <textarea name="comments" id="comments" ref={commentRef} value={commentRef.current.value} placeholder="ความคิดเห็นเพิ่มเติม" />
                <form>
                {/* <TextField label="ความคิดเห็นเพิ่มเติม"  variant="filled" fullWidth /> */}

                </form>
                
                
                
            </div>
            <Popup trigger={<button className="done-button" type="button" class="btn btn-primary" id="buttcancel"> ยืนยัน </button>} modal nested>
            {close=>(
                <div className="thankyou"> <h1>ขอบคุณที่ใช้บริการค่ะ</h1>
                    <button id="thank-button" onClick={()=>{props.handleForUpdate(null);}}> ปิด </button>

                </div>)
                
            }
            
            </Popup>

            
        </div>
    );
}