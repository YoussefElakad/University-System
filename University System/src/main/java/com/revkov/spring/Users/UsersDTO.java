package com.revkov.spring.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UsersDTO {
    private Long userid;

    private String username;
    private String password;

}