package com.eptison.eop.modules.sys.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.eptison.eop.datasources.DataSourceNames;
import com.eptison.eop.datasources.annotation.DataSource;
import com.eptison.eop.modules.sys.dao.SysUserDao;
import com.eptison.eop.modules.sys.entity.SysUserEntity;
import com.eptison.eop.modules.sys.service.SysUserService;
import org.springframework.stereotype.Service;


@Service("sysUserService")
public class SysUserServiceImpl extends ServiceImpl<SysUserDao, SysUserEntity> implements SysUserService {

    @Override
    @DataSource(name= DataSourceNames.SECOND)
    public SysUserEntity queryByUserName(String username) {
        return baseMapper.queryByUserName(username);
    }
}
