package com.example.moviemate.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
@Data
public class Image {
    @Id
    @GeneratedValue(generator="uuid")
    @GenericGenerator(name="uuid",strategy ="uuid2")
    private String fileId;

    private String fileName;
    private String fileType;
    private String owner;
    @Lob
    private byte[] fileData;
    public Image(){}
}
