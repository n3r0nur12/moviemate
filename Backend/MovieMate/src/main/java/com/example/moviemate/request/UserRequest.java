package com.example.moviemate.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRequest {
    private Long userId;
    private String usergender;
    private String username;
    private String userbio;
    private String userfacebook;
    private String userinstragram;
    private String usertwitter;
    private String usertiktok;
    private String userpassword;
    private Long userage;
}
