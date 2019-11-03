varying lowp vec3 fragmentPosition;
varying lowp vec3 fragmentNormal;
varying lowp vec3 fragmentColor;

// out lowp vec4 fragColor;

void main(void) {

    lowp float conv = 1.0 / 255.0;
    lowp vec3 lightPos = vec3(1.0, 16.0, 1.0);
    lowp vec3 lightColor = vec3(1.0, 1.0, 1.0);
    lowp vec3 objectColor = vec3(19.0*conv, 109.0*conv, 21.0*conv);

    // ambient color
    lowp float ambientStrength = 0.4;
    lowp vec3 ambient = ambientStrength * lightColor;

    // diffuse color
    lowp vec3 normal = normalize(fragmentNormal);
    lowp vec3 lightDirection = normalize(lightPos - fragmentPosition);
    lowp float diff = max(dot(normal, lightDirection), 0.0);
    lowp vec3 diffuse = diff * lightColor;

    // specular color
    // lowp float specularStrength = 0.5;
    // lowp vec3 viewDir = normalize(viewPos - FragPos);
    // lowp vec3 reflectDir = reflect(-lightDir, norm);
    // lowp float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    // lowp vec3 specular = specularStrength * spec * lightColor;

    lowp vec3 result = (ambient + diffuse) * objectColor;

    gl_FragColor = vec4(result, 1.0);

    /*
        // ambient
        float ambientStrength = 0.1;
        vec3 ambient = ambientStrength * lightColor;

        // diffuse
        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(lightPos - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = diff * lightColor;

        vec3 result = (ambient + diffuse) * objectColor;
        FragColor = vec4(result, 1.0);
    */
}
