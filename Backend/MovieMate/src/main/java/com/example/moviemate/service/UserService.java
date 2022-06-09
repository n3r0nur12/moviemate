package com.example.moviemate.service;

import com.example.moviemate.model.Movie;
import com.example.moviemate.model.Review;
import com.example.moviemate.model.User;
import com.example.moviemate.repository.MovieRepository;
import com.example.moviemate.repository.ReviewRepository;
import com.example.moviemate.repository.UserRepository;
import com.example.moviemate.request.UserRequest;
import com.example.moviemate.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private UserRepository userRepository;
    private ReviewRepository reviewRepository;
    private MovieRepository movieRepository;
    @Autowired
    public UserService(UserRepository userRepository, ReviewRepository reviewRepository, MovieRepository movieRepository){
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    public User createOneUser(UserRequest newUser) {
        return userRepository.save(new User(newUser));
    }

    public User updateOneUser(UserRequest newUser) {
        Optional<User> user = userRepository.findById(newUser.getUserId());
        if(user.isPresent()){
            User toUpdate = user.get();
            toUpdate.setUserbio(newUser.getUserbio());
            toUpdate.setUserage(newUser.getUserage());
            toUpdate.setUsertwitter(newUser.getUsertwitter());
            toUpdate.setUserinstragram(newUser.getUserinstragram());
            toUpdate.setUserfacebook(newUser.getUserfacebook());
            userRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public List<UserResponse> getRecommendedUsers(Long loggedUserId) {
        List<User> users = userRepository.findAll();
        List<Movie> movies = movieRepository.findAll();
        Map<Long,ArrayList<User>> orderFriends = new TreeMap<Long,ArrayList<User>>(new Comparator<Long>() {
            @Override
            public int compare(Long o1, Long o2) {
                return o2.compareTo(o1);//Descending Order
            }
        });
        for(User friend:users){
            if(friend.getId()==loggedUserId){continue;}
            Long ci = 0L;
            for(Movie movie:movies){
                Review first = null;
                Review second = null;

                List<Review> firsttemp = reviewRepository.findAllByUserIdAndMovieId(loggedUserId, movie.getId());
                if(firsttemp!=null&&firsttemp.size()>0){
                    first = firsttemp.get(0);
                }
                List<Review> secondtemp = reviewRepository.findAllByUserIdAndMovieId(friend.getId(), movie.getId());
                if(secondtemp!=null&&secondtemp.size()>0){
                    second = secondtemp.get(0);
                }

                if(first==null||second==null){
                    ci-=25L;
                    continue;
                }
                if((first.getReviewcode()!=null&&second.getReviewcode()!=null)
                        &&(first.getReviewcode().equals(second.getReviewcode()))){
                    ci+=20L;
                }
                ci-=((first.getNumberOfStars()-second.getNumberOfStars())
                        * (first.getNumberOfStars()-second.getNumberOfStars()));
            }
            if(orderFriends.get(ci)==null){
                orderFriends.put(ci,new ArrayList<User>());
            }
            orderFriends.get(ci).add(friend);
        }
        ArrayList<UserResponse> result = new ArrayList<UserResponse>();
        for(Map.Entry<Long,ArrayList<User>>entry:orderFriends.entrySet()){
            for(User user:entry.getValue()){
                result.add(user.convertToResponse());
                if(result.size()==20){
                    return result;
                }
            }
        }
        return result;
    }

    public User getOneUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User saveOneUser(User newUser){
        return userRepository.save(newUser);
    }

    public UserResponse getUserInfo(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user==null){return null;}
        if(user.isPresent()){
            return user.get().convertToResponse();
        }
        else{
            return null;
        }
    }


}
