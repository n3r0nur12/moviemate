package com.example.moviemate.controller;

import com.example.moviemate.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @GetMapping("/{owner}")
    public byte[] getImageByOwner(@PathVariable(name="owner") String owner){
        return imageService.getImageByOwner(owner);
    }

    @PutMapping("/{owner}")
    public void uploadImage(@RequestParam("file") MultipartFile multipartFile,@PathVariable(name="owner") String owner){
        imageService.uploadToDb(multipartFile,owner);
    }
}
