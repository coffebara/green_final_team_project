package com.itdaLearn.service;

import lombok.extern.java.Log;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
@Log
public class FileService {//파일을 로컬 파일 시스템에 업로드하는 기능을 수행합니다.
	public String uploadFile(String uploadPath, String originalFileName, byte[] fileData) throws Exception {
		
		UUID uuid = UUID.randomUUID();
//UUID(Univerrally Unique Identifier)는 서로 다른 개체들을 구별하기 위해서 이름을 부여할 때
		String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		String savedFileName = uuid.toString() + extension;
//UUID로 받은 값과 원래 파일의 이름의 확장자를 조합해서 저장될 파일 이름을 만듭니다
		String fileUploadFullUrl = uploadPath + "/" + savedFileName;
		FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);
//FileOutputStream 클래스는 바이트 단위의 출력을 내보내는 클래스입니다.
//생성자 파일이 저장될 위치와 파일의 이름을 넘겨 파일에 쓸 파일 출력 스트림을 만듭니다
		fos.write(fileData);; //fileData를 파일 출력 스트림에 입력합니다.
		fos.close();
		return savedFileName; //업로드된 파일의 이름을 반환합니다.
	}
	public void deleteFile(String filePath) throws Exception{
		File deleteFile = new File(filePath);
//파일이 저장된 경로를 이용하여 파일 객체를 생성합니다.
		if(deleteFile.exists()) {//해당파일이 존재하면
			deleteFile.delete();//삭제합니다.
			log.info("파일을 삭제하였습니다.");
		} else {
			log.info("파일이 존재하지 않습니다.");
		}
	}
}//상품이 이미지 정보를 저장하기 위해서 JpaReepository를 상속받는 ItemImgRepository
