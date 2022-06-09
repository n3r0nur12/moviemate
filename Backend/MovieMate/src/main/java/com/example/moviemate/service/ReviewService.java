package com.example.moviemate.service;

import com.example.moviemate.model.Movie;
import com.example.moviemate.model.Review;
import com.example.moviemate.model.User;
import com.example.moviemate.repository.MovieRepository;
import com.example.moviemate.repository.ReviewRepository;
import com.example.moviemate.repository.UserRepository;
import com.example.moviemate.request.ReviewRequest;
import com.example.moviemate.response.ReviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private MovieRepository movieRepository;
    
    @Autowired
    public ReviewService(ReviewRepository reviewRepository,
                         UserRepository userRepository,
                         MovieRepository movieRepository){
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public Review getReview(Long userId, Long movieId){
        List<Review> ans = reviewRepository.findAllByUserIdAndMovieId(userId,movieId);
        if(ans==null){
            return null;
        }
        else if(ans.isEmpty()){
            return null;
        }
        else{
            return ans.get(0);
        }
    }
    public Review makeReview(ReviewRequest reviewRequest){

        Long userId = reviewRequest.getUserId();
        Long movieId = reviewRequest.getMovieId();
        String reviewcode = reviewRequest.getReviewcode();
        Long numberOfStars = reviewRequest.getNumberOfStars();

        if(userId==null||movieId==null){return null;}

        User user = userRepository.getById(userId);
        if(user==null){return null;}
        Optional<Movie> check = movieRepository.findById(movieId);
        if(check.isPresent()==false){
            movieRepository.save(new Movie(movieId));
        }
        Movie movie = movieRepository.getById(movieId);

        List<Review> reviewId = reviewRepository.findAllByUserIdAndMovieId(userId, movieId);
        if(reviewId!=null){
            if(reviewId.isEmpty()==false){
                reviewRepository.deleteById(reviewId.get(0).getId());
            }
        }

        return reviewRepository.save(new Review(user, movie, reviewcode, numberOfStars));
    }

    public List<ReviewResponse> getReviews() {
        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewResponse> ans = new ArrayList<ReviewResponse>();
        for(Review curr:reviewList){
            ans.add(curr.convertToResponse());
        }
        return ans;
    }
}
