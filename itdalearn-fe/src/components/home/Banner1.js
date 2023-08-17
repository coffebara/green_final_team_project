import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export default function Banner1() {
    let navigate = useNavigate();
    return (
        <div>
            <div id="Banner_bg1">
                <h1 id="Banner_bg1_center1">Clone Startups<br />
                    Learn to code</h1>
                <div id="Banner_bg1_center2">코딩을 진짜로 만들어볼까요?<br />
                    실제 서비스를 따라 만들면서 코딩을 배우세요</div>
                <Button id="Banner_bg1_button" onClick={() => { navigate('/course') }} className="Button_Switch">시작하기 →</Button>
            </div>
        </div>
    )
}