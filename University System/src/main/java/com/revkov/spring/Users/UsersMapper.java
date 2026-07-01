package com.revkov.spring.Users;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UsersMapper {

    public UsersDTO toDTO(Users u) {
        if (u == null)
            return null;

        return new UsersDTO(
                u.getUserid(),
                u.getUsername(),
                u.getPassword()
        );
    }

    public Users toEntity(UsersDTO dto)
    {
        if (dto == null)
            return null;

        Users u = new Users();

        u.setUserid(dto.getUserid());
        u.setUsername(dto.getUsername());
        u.setPassword(dto.getPassword());
        return u;
    }
}