package com.example.moviemate.controller;

import com.example.moviemate.model.Review;
import com.example.moviemate.request.ReviewRequest;
import com.example.moviemate.response.ReviewResponse;
import com.example.moviemate.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private ReviewService reviewService;
    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping
    @ResponseBody
    public ReviewResponse getReview(@RequestParam(name="loggedUserId") Long loggedUserId,
                            @RequestParam(name="movieId") Long movieId){
        Review entity = reviewService.getReview(loggedUserId,movieId);
        if(entity==null) {return null;}
        return entity.convertToResponse();
    }

    @PostMapping
    @ResponseBody
    public ReviewResponse makeReview(@RequestBody ReviewRequest request){
        Review entity = reviewService.makeReview(request);
        if(entity==null){return null;}
        return entity.convertToResponse();
    }

    @GetMapping("/all")
    @ResponseBody
    public List<ReviewResponse> getReviews(){
        return reviewService.getReviews();
    }
}
