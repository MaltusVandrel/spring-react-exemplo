package br.com.msitec.teste.react.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.data.domain.Sort.Order;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Sort;

import java.io.IOException;

@JsonComponent
public class SortJsonSerializer extends JsonSerializer<Sort> {

    @Override
    public void serialize(Sort value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartArray();

        System.out.println("value:"+value);
        
        value.iterator().forEachRemaining(v -> {
        	System.out.println("   v:"+v);
            try {
                gen.writeObject(v);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        gen.writeEndArray();
    }
   
    
    @Override
    public Class<Sort> handledType() {
        return Sort.class;
    }
}