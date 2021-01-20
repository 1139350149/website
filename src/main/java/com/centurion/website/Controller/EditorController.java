package com.centurion.website.Controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class EditorController {

    private final static String IMAGEFILEPATH = "src/main/resources/static/uploadImage/";

    /*
     * 上传图片
     */
    @RequestMapping(value = "/uploadPicture", method = RequestMethod.POST)
    @ResponseBody
    String uploadPicture(@RequestParam("uploadPicture") MultipartFile file, HttpSession session) {
        String fileNewName;
        String realPath = IMAGEFILEPATH + session.getAttribute("loginUser");

        File fileDirectory = new File(realPath);

        if (!fileDirectory.isDirectory()){
            System.out.println(fileDirectory.mkdirs());
        }

        if (!file.isEmpty()) {
            try {
                Date date = new Date();

                SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd-HH-mm-ss");
                String fileTotal = file.getOriginalFilename();
                int fileDot = fileTotal.lastIndexOf(".");
                String fileName = fileTotal.substring(0, fileDot);
                String fileType = fileTotal.substring(fileDot + 1);

                fileNewName = fileName + '-' + dateFormat.format(date) + "." + fileType;

                BufferedOutputStream out = new BufferedOutputStream(
                        new FileOutputStream(new File(realPath + "/" + fileNewName)));
                out.write(file.getBytes());
                out.flush();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return "FileError";
            } catch (IOException e) {
                e.printStackTrace();
                return "IOError";
            }
            return fileNewName;
        } else {
            return "error";
        }
    }

    /*
     * 删除图片
     */
    @RequestMapping(value = "deletePicture", method = RequestMethod.POST)
    @ResponseBody
    Boolean deletePicture(@RequestParam("fileName") String fileName  , HttpSession session) {
        String filePath = IMAGEFILEPATH + session.getAttribute("loginUser") + "/" + fileName;
        File file = new File(filePath);
        if (file.exists()){
            return file.delete();
        }
        return false;
    }

    /*
     * 获取图片，以流的形式
     */
    @RequestMapping(value = "/getPicture", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public byte[] getPicture(@RequestParam("fileName") String fileName, HttpSession session) throws Exception {
        File file = new File(IMAGEFILEPATH + session.getAttribute("loginUser") + '/' + fileName);
        System.out.println(file);
        FileInputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        inputStream.close();
        return bytes;
    }

}
