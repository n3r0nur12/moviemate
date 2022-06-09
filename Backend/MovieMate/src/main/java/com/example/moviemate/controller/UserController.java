package com.example.moviemate.controller;

import com.example.moviemate.model.User;
import com.example.moviemate.request.UserRequest;
import com.example.moviemate.response.UserResponse;
import com.example.moviemate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseBody
    public User createOneUser(@RequestBody UserRequest newUser){
        return userService.createOneUser(newUser);
    }

    @PutMapping
    @ResponseBody
    public User updateOneUser(@RequestBody UserRequest newUser){
        return userService.updateOneUser(newUser);
    }

    @GetMapping("/{userId}")
    @ResponseBody
    public UserResponse getUserInfo(@PathVariable(name="userId") Long userId){
        return userService.getUserInfo(userId);
    }

    @GetMapping
    @ResponseBody
    public List<UserResponse> getRecommendedUsers(@RequestParam(name="loggedUserId") Long loggedUserId){
        List<UserResponse> check = userService.getRecommendedUsers(loggedUserId);
        for(UserResponse user:check) {
            System.out.println(user.getUsername());
        }
        return check;
    }
}
