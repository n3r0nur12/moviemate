package com.example.moviemate.model;

import com.example.moviemate.request.UserRequest;
import com.example.moviemate.response.UserResponse;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    public User(UserRequest entity){
        this.username = entity.getUsername();
        this.userpassword = entity.getUserpassword();
        this.userbio = entity.getUserbio();
        this.userfacebook = entity.getUserfacebook();
        this.userinstragram = entity.getUserinstragram();
        this.usertwitter = entity.getUsertwitter();
    }

    private String usergender;
    private String username;
    private String userbio;
    private String userfacebook;
    private String userinstragram;
    private String usertwitter;
    private String usertiktok;
    private String userpassword;
    private String picture;
    private Long userage;

    public UserResponse convertToResponse(){
        return new UserResponse(this);
    }
    public User() {}
}
