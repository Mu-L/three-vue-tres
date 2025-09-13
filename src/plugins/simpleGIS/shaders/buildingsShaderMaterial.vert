varying vec3 vPosition;
void main(){
	// vPosition=modelMatrix*vec4(position,1.);
	vPosition = position;
	csm_Position=position*vec3(1.);
}