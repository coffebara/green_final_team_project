import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export default function Banner3() {
    let navigate = useNavigate();
    return (
        <div>
            <div id="Banner_bg3">
                <h2 id="Banner_bg3_center2">IT-DA가 알려주는 코딩 강의</h2>
                <div id="Banner_bg3_center3"> 
                2023년 새롭게 선보이는 IT-DA의 강의 컨텐츠를 공개합니다. 
                검증된 강사진의 설명과 피드백을 통해 어려운 내용을 쉽게 가르쳐주며,
                또한 여러분들의 실력을 향상시키기 위해 언제 어디서든지 강의를 들을수 있도록 제공하고 있습니다.
                저희 또한 여러분들이 성공할 수 있도록 끊임없이 노력하며 발전하겠습니다.
                IT-DA와 함께라면 여러분들도 이제 코딩마스터가 될 수 있습니다.</div>
                <Button id="Banner_bg3_button" onClick={() => { alert("나중에 연결해주세요") }} className="Button_Switch">시작하기 →</Button>
                
            </div>

        </div>
    )
}