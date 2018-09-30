package com.eptison.eop.modules.sys.service;

import com.baomidou.mybatisplus.service.IService;
import com.eptison.eop.modules.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

public interface SysUserService extends IService<SysUserEntity>  {
    /**
     * 根据用户名，查询系统用户
     */
    SysUserEntity queryByUserName(String username);
}
