package com.example.moviemate.service;

import com.example.moviemate.model.Image;
import com.example.moviemate.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public void uploadToDb(MultipartFile file, String owner){
        Image image = new Image();
        try{
            image.setFileData(file.getBytes());
            image.setFileType(file.getContentType());
            image.setFileName(file.getOriginalFilename());
            image.setOwner(owner);
            imageRepository.save(image);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public byte[] getImageByOwner(String owner){
        List<Image> foundimage = imageRepository.findAllByOwner(owner);
        if(foundimage==null){
            return null;
            //return imageRepository.findAllByOwner("nullowner").get(0).getFileData();
        }
        else if(foundimage.size()==0){
            return null;
            //return imageRepository.findAllByOwner("nullowner").get(0).getFileData();
        }
        return imageRepository.findAllByOwner(owner).get(0).getFileData();
    }
}
