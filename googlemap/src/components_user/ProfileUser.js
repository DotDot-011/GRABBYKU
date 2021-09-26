import './ProfileUser.css'
import React,{ useEffect , useRef, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';



export default function ProfileUser(props){
    const {citizenId , Fname ,Lname , birthDate , phone,profilepicture,passwd} = props;
    
    const [file,setFile] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgYGhwYGhgYGhoYGBgYGBoaGhgZGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQsJCs0NDU4NDQ0NDQ0NDQ0NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4AMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQUGAgMEBwj/xAA/EAACAQIEAwUFBgQGAQUAAAABAgADEQQSITEFQVEGImFxgRMyUpGhQmJyscHRFCMz8Ac0gpKy4fEWU3Ois//EABoBAAIDAQEAAAAAAAAAAAAAAAAEAQIDBQb/xAAsEQACAgEDAwMEAgIDAAAAAAAAAQIRAwQSIQUxQRNRYSIycYEUsaHxFSMz/9oADAMBAAIRAxEAPwCxWEWkd4TqM8+gywywhIJDLFC8IAFohHeAklRWmQERMLyCyHaIiF4yYAxWiP8AflGWAFzoBqT0AlI7QccNW9OmbU9iebnn6Srkol8eNzfBdlN7Ec45x8Hq56FJutNfmBb9J2GWTtFJJp0EI4hJAI4QvABRxXheACtHETHAAhCECoQiEcAARwAgRIstQQgBDLCyKEYER5YoE0EQjgFhYADHEVhaFkUMRGF9bevpNeLxIpoztsgJ/YeptCydt8Fb7W8Tt/IQ6kA1D4cl/eVVUJ2E6SC7NUcm7HMeuvKYvV5KLD6mYSds6mKCjGi0dnqtVqQRAoCEgudbXN7KvM685N0sNbVmZ26t+ijQCVTs1xAUA4cNZspWwucwvf5yeTibv/Tw7kdXIUTWL4FM0HudIlYhOSn/ABB972aeWZz+YE60B5m56gWlrF3GvI4rzKKFkBCEVpIDhFaOABCK0LQAyiitHADbEYXiMqgCEIGSSEVpgayDd1/3D94e3T40/wBw/eRaCmZ5Y1EFN9tfLWEkAhC8j+NY32VMke+11Xz5n01kN0EU5S2oMDiQ9Ss9xlTKgPLu3LG8guOcY9pdE9wHU83I/ScIxZFL2S6BmLOebdB5aSPxFRhlVQCxva+gUDdj9Jk5Wh6GBJ2wNMsbtoOQ/eGcD3VJ9I0cqLO6X8sn0Jm4ai/LrylBkOF4pkr03Yd3MAwtpZtJ6CpB2IPSxB/KefGNGym4JHlpLRlRhlw73dnoJWFp5hiaNZquZazoFUWKk3La3vrry3lp4Dx5riliCCTolUCwY/C4+y3Q7GXjO+KMJ6aUY2nZZ7RZZlaE0FaMbQtMoGACtFaZRGACtCZQgBjCOEABmsLk2HUnSRGK7QU1uEBdttNFHrzm/iOBZ+8SXA2TYD/SND6zhRANAAPIWmE8rj4OtoumxzrduX4Rw1+LYl9gUHRFt9TrOCotVtWzt53Mn4pl6rZ1I9LglwysshG4I8xCw/u0sxF99ZzVsEjfZseo0gp+5WfTmvtZBo7L7rEeRI/KdFPiNdfdrOPAkMvyaZYnAMmo7y+G48xOKXUr7MQyYdjqUSbw3aaov9WmHHNk7rf7DofSR2P4n/EOX2A0CnQqOhHWc81tSBN9mGzDf/uWtmUcUYy3I2TnxtbIruN1U2nROTiqXouPuk/KVl2NF3IPhnDDXvUqs1ibDqep12EmMPw/2f8ATdrc0bVT+oM6MAoWkgHwL9RePEVwiszbKL/sBKxRLds3Qmvh2Gxlan7ZcG5pHZ1sWI6hDqw8pmGvt/34gjkfCRHLCTai02gaa7jiI6yc4Hw5KiuXUkggAai2l72h/wCnz7TLmIQgkNa5B07plt6sNrqxdn+0qF/4Z2uw7qMeZ+DNzMmsdxmjSNne7fAozMPO2g+ciu0Bo0cHSwuRHqNd2fKMyXYkOG3DEymYvFqmrnU8tyYl/wAhN3GMebHMPRseRermdL2PR+F8Yp12ZUDAqL96wuOo1kjPLuznGlFdXFxY2N+aNoZ6iI7pc0pxal3Rzep6THgkpYXcX/aCEcDGbOYKEYhaFgKEcRPpCwHOPHYXMCy78/GdsUrOKapm2nzywyUo/wCyAjnVj6GVsw2b6HnOSJuO10eywZo5oKa8hHFEDINhmRHFMLlOZRodx0Ml5ycR/ptfw+d5Me4vqcaljd+CEEIQm5wQiZQQQdiCPnFMHqgecpOcYK5M0x455HtgrY8MhVFU8gB8tJycWXOoUaguua3Jb94zYzE7mYgXiGTW39MUdjD0ikpZpUelp24waKqItQqihRZLAAC3MgyE4vxXA13WsmenUDqXuhyuAdzl2YdZQq3FKamxuSOVv3mocYp/eHoP3nNw6R4574Jp/k3lp9H9rl/k9WwuLp1LtTdW01tv6jebqjhQWOgUEnyE8ywuJB7yNr1GhEksVxitUT2bvdeeliR0Jj38muJLkzfTLaeN2jh4jjgWes5sGbzIB0A+QmFZFrUjbVSLqRyIBsfCR/HR/LH4h+UXZito6HkQwHnoZbTxVbvJl1KTU1j8JERgKhR1PjY+R0M9u4HifaUEfnbKfNdP2nlOI4FmYsrBbm9iNj4HpL/2HqEU3Rt0IPzGv1EbxS25V88HL1Ed+lkvZp/os5ivC804nFJTXM7BRsOrHoqjVj4C8fs4VN9jdeaMTi0QgO3eb3UALO3kg19ZzBq1Xa9BOpsazeQ1Wn63OvKdGFwiU75FsTuxJZ28Wc6mHfsW2pdzBTVfl7NeV7M5HiPdX6nym+nRVfE/ETc/MzaIoFbHaK0LwvAg04mlnUj5echQOssBMjOIULHOBod/PrMcsb+o7XSNUoSeKfZ9vycU58TmXvrrb3h1X950TnxNRhZUF2PPkB1i6PQ5OIswp49CNWt4GcfEMYHGVdtyesbcMY6lxf8AvnOGrTKkq24mkYq+DmZ8ubZTVJ+TXMojOevXNjl/vyhkyRguWLYdPPNLbFfsyq1eQ9TNDMBqTYczBTfUSK47WICqNjcn0t+85Dm886Z6WOOGhwOaVs7sNj6THLm1vpfQHyMkQJQ7y1cExvtEsx7yaHxHIxyOOMexwc2pyZpXJ/o4u0WD2qr5N+hkFeXp0DAqwupFiPCQrdnVvo5A6WBI9ZoLkVw3EFHB5HQjzlvwWEeq4RBc/IADmTIPGcFVFDoWOWxIOtxfUi20uvY5e/UPRFHzPX0imaClJL3OxoNRKGCb9iC4twuooNOotr7HcEjYgyrYWu1Cpe3gy9RPWe0uMw6oKdYku/uIgvUJOxA5DxNhKNxLgTsud2p0rDUsxJ8AQBaaY4ODcV2MdTnhqIKT4kv8nDT7Qi+qEDqDe30ln7P8WFNmZRnVwOdtjIHsv2Lr41Wq02QIjFSWYgkgX0FuklqvAK9JVL0nSkRYHm/md0B8ZrzuVeGKwjH0p7n3VUWvDceGIOTDr39czOe4luYt75+6PWSGG4eqNnYl6h+2+4HRF2RfASiU8UtEqwZUK6jUD0tzEudLjAcA0qNapcA3CZE1F/fewPmLx9SXk4eXE4/aShMJGh8W+yUaY++71G9VWw+syGBrt7+KYeFJEQfNgx+stu+DDZ8kiAZiWtvp56TiHB0PvvVfX7dV/wAlYD6TKnwmgNqKeN1zX9WvJsio+53ZYZZnaIrCypjliamCCDsZsMVoEptNNeCCxNAo1uXIzTaWCrSDAgi4P0kRicEyXI7y9eg8YtOFco9NoOoxyx2TdP8As5pDcbqKrLqL2OmnpePiPFrXRNTsW5DykGygm51PU6n6xHJqlB1Hudv+J60an2MamJU7sPIa/lMP4leQY+Ssf0m4CZBSeRie5zdtNsaUFhjSaS/BxrXsbZHsTp3beY1nLxRC66I4Km9yBtzks+GLDcA7g9DB0I3+fKa7ZQ+raKynjzXi3p2Um824TFNTcOvLlyI6GSvEuGG5ZBpzXp5SGtG4TUlaOFnwSwypos9Pj1Ii5zKelifkRNf/AKip3tle3XT8pXMs68Lw532Fh1OgkuSXLZSOOU3UVZa/aqy5lIII0t+0vf8Ahvw0PTrVToxORHsDlsLlgDpe5nnvCOAGoy0qaFnY+8Li1+ZI2A8Z7j2d4OuEoJQVma1yWY5jmbVrHpeZRqclJeB7JB6fC8T7vn9FM4p/hTTqs1RcXX9oSSXqZXu3UkAEeko3Ev8ADniCVkpZfbKxstVWLIBzLX93SfQMwdwouT/2ek2Yg0Q/ZLgK4LDJh1bMR3nf4nb3j4DYDwE143g1SsjjE4l2Qhr06QFJLa2zNq7H/UJOqdNrSudr+PpQpmmjA1HFrDUqp5mWSBpJcnlCYREvlRQddbXJ1+I6z0jDJZEU8lUfQSl8IwvtKqLyHeb8K6y8xyK4OXqpJtIIAR2jmgkK0CYGKQBthCKABaEINADCq4UFmIAGpJ0AHjKRxztA1YlKZK0+Z2Z/E9B4TLtZxJnqNRGiIbEfG1r3Ph4SFw1BnZUS2ZzYX2ueZnK1WqcpenD8HrukdLhCC1Gb2tL2XuahNqUifASc4rwlMOiL7zsbs55BRso6XP0kXIxaFd5s2z9ZTv0Vx7mtaYHKbIQj0ccY9kcjJnyZHcpNhEwB3nNVxyA5Rd2+FBmPqdl9TMCtZ+a0h4d97efuiS+VTKRuLtcMzrJkFyQB1JtI6saTH3c5+6L/AFktwrgBrVVQZXdr5WqsdSBe2xUGWVewmN0GSgo659B6BYi9KlK06OtDqcpRUckb+aKJRwxv3KKr4sbn5CTXAezuJxlTJTayg99wtkUdM2t28BLzwrsEncfEVS6sbFEGRAd7M3vEXFtxeegYTCU6SKlNFRF0VVFgPSHprzyUnreKgqKTw3sVg0GVv4jMwAN69RM1r6rkK3HhLTgMAlBBTpghRcgFmc62J1Yk/WdVCkrKUYAgMwsR43H5zXXwChWys4sDYB2sNPOXXHYTc3J3LuY1ayrudTso94+QmKUCzoXG4YhNwtgLX6nWdOEwyKAyqASAb7nUdTrM2/qL4Ix+qiSVciL4pkpq9Q3CohYjM1idxpeeNu5YlmJLE3N9Tc/+bT0P/EfiWRFoKe85zN4Ih0v5mVzs9wjMRVqDQaop0ufiPhGMUTDPkUVySXZ/h3skzN772J8ByX9ZLZY4RhHKnJydsWWGWO8JJQWWGWZQgAQhCABEY4QA887TU8uJqfeysPVR+oM3dkcPmxAb/wBtS3qRlH5yU7Y8NZstZFJyjK4G9t1bx3M6eyXD2p02dxZnIsDuEG1x5zkrTv8Ak/Hc9g9fjXS+H9Vba+Th7WPeqi/Cl/mTIKS3atj/ABG1+4v6yDelm985vu7L8uc6TRwcKqCMGxVzZFznqDZB5v8AteL+FZ/6jkj4EuqevNvpJbDcKrOt1SyD7TWRQPMzkqplJFw1ua7ekijVST7GFOmqiyqFHQC0yhCBJtw2Iam6uvvIQw8SNbeu09owOKWqiVEN1dQwt4/93niUt3Ybj4pH+HqtZGN0Y7I53U9FPXrM5xtGkJUy+1AVzAfas6/jTUj1AkmrXAI2OvpOKouYEcxt4HcGZcNqEplIsyEqR+XpaLl2baOjuOuVvmLH/jNzjQ+RnPVOWoh+IMh9O8v6zpgQacEbon4R+U04nELTapUY2VKYJPQXY/pNmAPcHhcfIkfpNGJoZxVU21CrrqNr6/OHkq/g88p4N8VWbE1wQrH+Wh3yD3b9ABy53k7B1IJB3BsYWj8UkuDkZZylJ7gijAgZYyFHCKAGUULwgA4QhAAhCEACBhCAeKKzx3hz1cQgQboLsdlAJ3knw/gtKlY2zv8AG2v+0cpJxWkUaPLJxUSv8e9vWb2NNDkFs7bKW+HMdCBOXD9lnPv1FXwUFj89pa4Qoss0oqlwQSdmKQ953PyH5CDdmKPxOPUfqJOwMhxRHrT9yCxfYStlD0HVwRfK3dceAOx+kq+Kwr02yVEZG6MLf+fSe18Ge9JfC4+Ux4rweliVy1EB6HmIr6lOmdOCuKZ572P7SMjijWclHAVGbXIwPdBPwm9vCegurBg677FeTr08+hnn3Guw1WndqXfTp9oeU6uzfas0rYfF3XL3Vdgbr91xz8GkSinyjWMvDL1iKysmdd0IYj7Qse8CORted0jHpI4DKdxo6HcHxGh9Y0WqugqAgaDMlz8wReZstt9jpwPukdHcf/c/vNH8QAXG7M9gPAAC56DQzXTpVBm/mABmLHKovc72JJnHxHH0MGhdyMxuQL3dz0glbJqjm4ooFQ26A/ScglOxHavFOxfLRFz7uVzYdL5vrab8L2tI/rUrD46ZLW80OvyvHYOo0zkZsMnJySLVC058Ji0qqHpuHU8xyPQjkfAzol07Fmmu4QhCSARWjhAAhCEACEIQAIQhAAhM0QnYXidCNwRAKMYRspGhigBqxGIVEZ3YKi6ljsP3MqeO7U1XP8hQicncZnbxC7KPOcnHOJnEPZT/ACkPcHJ2Ghc+A5TgmbY7hwKrkehf4bcWZjVo1XLuW9opIAuCoDAAdLCX2eC4bEvTdXRsroQVPQ+Ph4T2Lszx1MXSzjR1stReat18jyi2SLTseg1VExODiPB6FcWqU1Pjax+c75CdqOLrhqQLXOYgWX3iOYHpM43fBZlN4rgK2AvUwlZzSBs67qhO1wdCJnwTtlXevTp1ghR2yMQuVgTopve1ry34PGYXFUGSm6lWUqUOjLcc1Ot/GeOVUyMyndWK38VNr/SbJp2mR9Xg9v4yGTD1mQ2dablT0YKSDPEHqO5zO7O5Grsbn6yycF7Z1f8AL12D0nRqYc++pZSAWPMbCQWL4dUo2zgZdAGBuL9D0lMMottI0zYckKclwznEIQjLFx4aq9N89Nij8yNm8HXZhLfwbtAlayOMlXp9l/wE8/AynzF0B0P9+vKSnRjkwxmvk9NhKlwbtEUsmIN02Wqd18Knh975y2Dw56g73HIiXTsRnjlB8jhCEkzCEIQAIQhAAhCEAN9Jbow8RvpD3VIJBuRYA3tbnNav3SvUj6TCVotfA6j3N5CdreIWRMOgs1S4ZgfcTMAR5te3gJ1ca4mMPTzWu57tNPif9huZTmxWZFzsxqKzNm0KsWbMfIDYCRJ+BjT49zcn2N4o0s/scp+DPmN8w+7ta8106SKjM65ir5LBiBtz8Jn/ABVPP7XK+ffLpkzdb72vrNBxF6bIb5mfPfltY/WU5HjfWFJAj5CQ4vlzEBbaGx3P/U2YfGvg8RmpH3SLqdnQgHKfnvOPEVwyU1F7opB9TfSLHVg7lwDY2330AH6Qqws9p4NxWniaa1KZ0O45q3NSJ5v/AIg8Q9piigPdpAL4ZjqT+UiOB8aqYSoHTVSQHQ7OvPyPQwR/b4ku326hc36XvY/IfKZKO2VlrtUY0eAVKi5xZDa63JDN8tryEdCpKsLEHUHcGelGQ/H+EiopdR31BOn27fZPjFNRjcvqizsdP1EMX/XNJrw34ZTBy8x+Yno70VdMji6soDA87jWebUarZlOUABlJueQIJ+k9NVwQCDcHUeR2mWlVWb9VaajxxyUbG4VqLmmxvzRj9pf3HOapbeN8P9tTsPfXvIfHp6yoI1+ViNCOhnShLccCUaMoQhNCoGSPBuMvhjla70fh3an1KdV6r8pHQhyis4RkqZ6Ph6yuqujBlbUMNjNk8+4VxF8M90BZCe/T6/eT4W8OcvWCxaVUDo2ZTz5g8wRyPhLqRzsuJwfwb4R2iIljIIQgRAAhCEACasTiFpozucqqLkn+95sawuSbAC5J2FuZlF43xU4hwF0pIe4PjYfbPh0HheVbNMWNzfwc2Pxr13NV9OSJ8CdPxHcmaDCEpZ00lFUghCECQhCEkAnZwdrV0/F+hE45lRqZWVvhYH5GQ1wC7l9Mxf3T5H8oyb69dfQxHY+R/KJtcMajy1+jzQCXHsvjM9P2ZOqbeKnb5bSnTv4PjDSrI32T3W8VbT9pzcUtsz0+qwetgrylaL7Kn2hweSpnUd19+gbn+8thnNxLC+1psnO118GG06sZU7PLTj7lKMIEctiNIRkXCEISQATo4fjnw7501Vv6icnHUdGHIznEIEOKapnpkI4pc5AQMIQAIo5Wu0fGLA0aZ1OjsOX3QevWVstCLm6Rx9pOMe0Joof5YNnb4yPsg/AOfWQghCQdOEFCNIIQhILhCEIAEJ0YDCtVdUQannyA5kzkpMcuu4JB81Yj9JJFq6M4GEIElx4RWz0kPMDKfMaTtbY+v5Sv9mMR76H8Q/Jv0lgbY+R/KKZFVjGJ20eaQMSmZTjPuezj9qLxwDF+0oqftJ3G9Nj8pJrKh2UxeSqUOzjT8Q2+ct06WCe6KPMa7D6WZrw+SqdoMLkqZhs92/1faEjDLdxvDZ6TdV7w9N/pKiabBc5HcJy5hsG3yv0uOe0eg7RzZqmEI4poVCEIQA9LgYQlzjhCEIAIzzV/ebzP/IxwlRjS/czCZCEJB0PIhGYQkAIxwhACxdjP6lT8C/8AKVrm/wD8j/8A6NCEsZL72ZwhCQakn2d/r/6G/SWl9j5GEItlN8Pj8nmqxwhOGz2keyOzg3+YpfjE9AaKEe0v2nB6t/6r8GNX3W8m/wCJlUwn+UxX4U/5NHCdHCcXP4Iwco4QmxmgmMIQJP/Z");
    const NewPasswdRef = useRef(null);
    const OldPasswdRef = useRef(null);
    const phoneRef = useRef(null); 

    useEffect(()=>{
        props.closeMenu();
    },[])
    function sendData() {
        // console.log(1)
        if(!!NewPasswdRef.current.value && OldPasswdRef.current.value === passwd){
            if(!!phoneRef.current.value && phoneRef.current.value.length !==10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง',"",2000);
            }
            else if(NewPasswdRef.current.value.length < 4){
                NotificationManager.warning('รหัสผ่านใหม่อย่างน้อย 4 หลัก',"",2000);
            }
            else{
                //sendData
                console.log(555)
            }
        }
        else if(OldPasswdRef.current.value === passwd){
            if(!!phoneRef.current.value && phoneRef.current.value.length !==10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง',"",2000);
            }
            else if(NewPasswdRef.current.value.length < 4){
                NotificationManager.warning('รหัสผ่านใหม่อย่างน้อย 4 หลัก',"",2000);
            }
            else{
                //sendData
                console.log(555)
            }
        }
        else if(OldPasswdRef.current.value !== passwd){
            NotificationManager.warning('รหัสผ่านปัจจุบันไม่ถูกต้อง',"",2000);
        }

    }
    
    return(
        
        <div className="profile-page">
            <div className="profile-picture">
                <img src={file}/>                
            </div>
            <form role="form">
                <br styles="" />
                <div className="user-info">
                    <div id="boxinfo-user">
                        <label>ชื่อ นามสกุล</label>
                        <input disabled  type="text"  className="name" value={Fname +' '+ Lname}  />
                    </div>
                    <div id="boxinfo-user">
                        <label>วันเกิด</label>
                        <input disabled  type="text"  className="birthday" value={birthDate}  />
                    </div>
                    <div id="boxinfo-user">
                        <label>เลขบัตรประชาชน</label>
                        <input disabled  type="text"  className="citizen-id" value={citizenId.substring(0, citizenId.length - 3)+"xxx"} />
                    </div>
                    <div id="boxinfo-user">
                        <label>หมายเลขโทรศัพท์</label>
                        <input   type="text" ref={phoneRef}  className="phone" placeholder={phone} />
                    </div>  
                    <div id="boxinfo-user">
                        <h4>สำหรับการแก้ไขรหัสผ่าน</h4>
                    </div>
                    <div id="boxinfo-user">
                        <label>รหัสผ่านปัจจุบัน</label>
                        <input type="password" required ref={OldPasswdRef}  className="password" placeholder=""  />
                    </div> 
                    <div id="boxinfo-user">
                        <label>รหัสผ่านใหม่</label>
                        <input type="password" ref={NewPasswdRef}  className="password" placeholder=""  />
                    </div>
                </div>
                {/* <input type="submit" id="submit" name="submit" onClick={sendData}  value="Update"/> */}
                <button type="button"  id="submit" name="submit" className="updateinfo-user" onClick={sendData}>Update</button>
            </form>
            <NotificationContainer />

        </div>

        
    );
}