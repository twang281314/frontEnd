package com.eptison.eop.modules.sys.controller;

import com.eptison.eop.modules.sys.entity.SysUserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Controller公共组件
 *
 */
public abstract class AbstractController {
    protected Logger logger = LoggerFactory.getLogger(getClass());

//    protected Long getUserId() {
//        return getUser().getUserId();
//    }
}