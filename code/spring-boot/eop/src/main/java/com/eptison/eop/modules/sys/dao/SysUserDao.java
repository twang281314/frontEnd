package com.eptison.eop.modules.sys.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.eptison.eop.modules.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysUserDao extends BaseMapper<SysUserEntity>{

    /**
     * 根据用户名，查询系统用户
     */
    SysUserEntity queryByUserName(String username);

}
