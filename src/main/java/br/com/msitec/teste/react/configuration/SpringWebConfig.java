package br.com.msitec.teste.react.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.module.SimpleModule;

import br.com.msitec.teste.react.serializer.SortJsonSerializer;

@Configuration
@EnableWebMvc
@EnableSpringDataWebSupport
public class SpringWebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        SortHandlerMethodArgumentResolver sortResolver = new SortHandlerMethodArgumentResolver();

        // For sorting resolution alone
        argumentResolvers.add(sortResolver);

        PageableHandlerMethodArgumentResolver pageableResolver = new PageableHandlerMethodArgumentResolver(sortResolver);
        pageableResolver.setMaxPageSize(10000);

        // For sorting resolution encapsulated inside a pageable
        argumentResolvers.add(pageableResolver);

//        argumentResolvers.add(new CurrentUserArgumentResolver());
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        SimpleModule module = new SimpleModule();
        module.addSerializer(Sort.class, new SortJsonSerializer());
        return new Jackson2ObjectMapperBuilder()
                .findModulesViaServiceLoader(true)
                .modulesToInstall(module);
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        //First converters added in WebMvcConfigurationSupport.addDefaultHttpMessageConverters and then we add our behaviour here
        Jackson2ObjectMapperBuilder builder = jackson2ObjectMapperBuilder();

        for (int i=0; i<converters.size(); i++) {
            if (converters.get(i) instanceof MappingJackson2HttpMessageConverter) {
                converters.set(i, new MappingJackson2HttpMessageConverter(builder.build()));
            }
        }
    }

}
