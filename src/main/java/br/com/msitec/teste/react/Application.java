package br.com.msitec.teste.react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(
		{"br.com.msitec.teste.react.serializer",
		 "br.com.msitec.teste.react.web",
		 "br.com.msitec.teste.react.model",
		 "br.com.msitec.teste.react.dao"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
