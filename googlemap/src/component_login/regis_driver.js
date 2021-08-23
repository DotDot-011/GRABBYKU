function RegisDriver() {
    return (
        <div>
            <h1>Register as Driver</h1>
            <form classname="" action="" method="post">
                <div>
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" placeholder="กรอกชื่อผู้ใช้" name="username"/>
                </div>
                <div>
                    <label>ชื่อจริง</label>
                    <input type="text" placeholder="กรอกชื่อจริง" name="fname"/>
                </div>
                <div>
                    <label>นามสกุล</label>
                    <input type="text" placeholder="กรอกนามสกุล" name="lname"/>
                </div>
                <div>
                    <label>วันเกิด</label>
                    <input type="date" placeholder="กรอกวันเกิด" name="birth_date"/>
                </div>
                <div>
                    <label>อายุ</label>
                    <input type="number" placeholder="กรอกอายุ" name="age"/>
                </div>
                <div>
                    <label>อีเมลล์</label>
                    <input type="email" placeholder="กรอกอีเมลล์" name="email"/>
                </div>
                <div>
                    <label>หมายเลขโทรศัพท์</label>
                    <input type="tel" placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />
                </div>
                <div>
                    <label>รหัสประจำตัวประชาชน</label>
                    <input type="text" placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />
                </div>
                <div>
                    <label>รหัสผ่าน</label>
                    <input type="text" placeholder="กรอกรหัสผ่าน" name="password" />
                </div>
                <div>
                    <label>ยืนยันรหัสผ่าน</label>
                    <input type="text" placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" />
                </div>
                <div>
                    <label>ชื่อซุ้มวิน</label>
                    <input type="text" placeholder="กรอกชื่อซุ้ม" name="win_name" />
                </div>
                <div>
                    <label>ป้ายทะเบียนรถ</label>
                    <input type="text" placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="plate" />
                </div>
            </form>
            <button type="button">ลงทะเบียน</button>
        </div>
    );
}

export default RegisDriver;
