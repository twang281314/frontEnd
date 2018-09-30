package com.eptison.eop.modules.sys.controller;

import com.eptison.eop.modules.sys.entity.SysUserEntity;
import com.eptison.eop.modules.sys.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {

    @Autowired
    private SysUserService sysUserService;


    @RequestMapping("list")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    /**
     * 根据用户名查询用户
     * @return
     */
    @RequestMapping("getUserByName")
    @ResponseBody
    public SysUserEntity getUserByName(){

        SysUserEntity user = sysUserService.queryByUserName("admin");

        return user;
    }
}
