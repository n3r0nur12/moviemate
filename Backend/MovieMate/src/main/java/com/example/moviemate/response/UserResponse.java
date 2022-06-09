package com.example.moviemate.response;

import com.example.moviemate.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse {
    private String usergender;
    private String username;
    private String userbio;
    private String userfacebook;
    private String userinstagram;
    private String usertwitter;
    private String usertiktok;
    private String userpassword;
    private Long userage;

    public UserResponse(User user){
        this.username = user.getUsername();
        this.userpassword = user.getUserpassword();
        this.userbio = user.getUserbio();
        this.userfacebook = user.getUserfacebook();
        this.usertwitter = user.getUsertwitter();
        this.userinstagram = user.getUserinstragram();
    }
}
