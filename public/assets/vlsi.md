vlsi///////////////////



1. 4-Bit Adder
Verilog
module adder_4bit(
 input [3:0] a,b,
 input c_in,
 output [3:0] s,
 output c_out);

assign {c_out,s}=a+b+c_in;

endmodule


Testbench


Verilog

module adder_4bit_sb;

reg [3:0] a;
reg [3:0] b;
reg c_in;

wire [3:0] s;
wire c_out;

adder_4bit uut (
.a(a),
.b(b),
.c_in(c_in),
.s(s),
.c_out(c_out)
);

initial begin
a=4'b0000;b=4'b0000; c_in=0;
#10 a=4'b0001;b=4'b0001; c_in=1;
#10 a=4'b0010;b=4'b0010; c_in=0;
#10 a=4'b0011;b=4'b0011; c_in=1;
#10 a=4'b0100;b=4'b0100; c_in=0;
#10 a=4'b0101;b=4'b0101; c_in=1;
#10 a=4'b0110;b=4'b0110; c_in=0;
#10 a=4'b0111;b=4'b0111; c_in=1;
#10 a=4'b1000;b=4'b1000; c_in=0;
#10 a=4'b1001;b=4'b1001; c_in=1;
#10 a=4'b1010;b=4'b1010; c_in=0;
#10 a=4'b1011;b=4'b1011; c_in=1;
#10 a=4'b1100;b=4'b1100; c_in=0;
#10 a=4'b1101;b=4'b1101; c_in=1;
#10 a=4'b1110;b=4'b1110; c_in=0;
#10 a=4'b1111;b=4'b1111; c_in=1;
end

endmodule


//////////////////////////////////////////////////////////////



2. 32-Bit ALU
Verilog
module alu_4bit(

input [31:0] a,b,
input [2:0] opcode,
output reg [31:0] y

);

always @(a,b,opcode)

begin

case(opcode)

3'b000:y=a+b;
3'b001:y=a-b;
3'b010:y=a*b;
3'b011:y=a/b;
3'b100:y=a&b;
3'b101:y=a|b;
3'b110:y=~(a&b);
3'b111:y=a^b;

endcase

end

endmodule
Testbench
Verilog
module alu_4bit_sb;

reg [31:0] a;
reg [31:0] b;
reg [2:0] opcode;

wire [31:0] y;

alu_4bit uut (
.a(a),
.b(b),
.opcode(opcode),
.y(y)
);

initial begin

a = 32'b0100;
b = 32'b0010;

opcode=3'b000;
#10 opcode=3'b001;
#10 opcode=3'b010;
#10 opcode=3'b011;
#10 opcode=3'b100;
#10 opcode=3'b101;
#10 opcode=3'b110;
#10 opcode=3'b111;

end

endmodule



////////////////////////////////////////////


3. SR Flip-Flop
Verilog
module SR_FF(

input [1:0] SR,
input reset,clk,
output reg Q,Qb

);

always @(posedge clk)

begin

if(reset==1)
Q=0;

else

begin

casex(SR)

2'b00:Q=Q;
2'b01:Q=0;
2'b10:Q=1;
2'b11:Q=1'bX;

endcase

end

Qb=~Q;

end

endmodule
Testbench
Verilog
module SR_FF_SB;

reg [1:0] SR;
reg reset;
reg clk;

wire Q;
wire Qb;

SR_FF uut (
.SR(SR),
.reset(reset),
.clk(clk),
.Q(Q),
.Qb(Qb)
);

initial begin
clk=1;
forever #5 clk=~clk;
end

initial begin

reset=1;SR=2'b00;
#10 reset=0;SR=2'b00;
#10 reset=0;SR=2'b01;
#10 reset=0;SR=2'b10;
#10 reset=0;SR=2'b11;

end

endmodule


//////////////////////////////////////////////////



4. JK Flip-Flop
Verilog
module JK_FF(

input [1:0] JK,
input reset,clk,
output reg Q,Qb

);

always @(posedge clk)

begin

if(reset==1)
Q=0;

else

begin

case(JK)

2'b00:Q=Q;
2'b01:Q=0;
2'b10:Q=1;
2'b11:Q=~Q;

endcase

end

Qb=~Q;

end

endmodule
Testbench
Verilog
module JK_FF_SB;

reg [1:0] JK;
reg reset;
reg clk;

wire Q;
wire Qb;

JK_FF uut (
.JK(JK),
.reset(reset),
.clk(clk),
.Q(Q),
.Qb(Qb)
);

initial begin
clk=1;
forever #5 clk=~clk;
end

initial begin

reset=1;JK=2'b10;
#10 reset=0;JK=2'b00;
#10 reset=0;JK=2'b01;
#10 reset=0;JK=2'b10;
#10 reset=0;JK=2'b11;

end

endmodule




/////////////////////////////////////////////////////////



5. D Flip-Flop
Verilog
module D_FF(

input D,reset,clk,
output reg Q,Qb

);

always @(posedge clk)

begin

if(reset==1)

begin

Q=0;
Qb=~Q;

end

else

begin

Q=D;
Qb=~Q;

end

end

endmodule
Testbench
Verilog
module D_FF_SB;

reg D,reset,clk;

wire Q;
wire Qb;

D_FF uut (
.D(D),
.reset(reset),
.clk(clk),
.Q(Q),
.Qb(Qb)
);

initial begin
clk=1;
forever #5 clk=~clk;
end

initial begin

reset=1;D=0;
#10 reset=0;D=0;
#10 reset=0;D=1;

end

endmodule


//////////////////////////////////////////////


6. Mod-N Synchronous Counter
Verilog
module modn_counter (

input clk,
input reset,
output reg [3:0] count

);

parameter N = 16;

always @(posedge clk or posedge reset)

begin

if(reset)

begin
count <= 4'b0;
end

else

begin

if(count == N-1)
count <= 4'b0;

else
count <= count + 1;

end

end

endmodule
Testbench
Verilog
module modn_counter_tb;

reg clk;
reg reset;

wire [3:0] count;

modn_counter uut (
.clk(clk),
.reset(reset),
.count(count)
);

initial begin
clk=1;
forever #5 clk=~clk;
end

initial begin
reset=1;
#10 reset=0;
end

endmodule



/////////////////////////////////////



7. Booth Multiplier
Verilog
module booth_multiplier(

input signed [3:0] X,Y,
output reg signed [7:0] Z

);

reg [1:0] temp;
integer N;
reg P;
reg [3:0] X1;

always @(X,Y)

begin

Z = 8'b00000000;
P = 0;

for(N=0; N<4; N=N+1)

begin

temp = {Y[N],P};
X1 = -X;

case(temp)

2'd2 : Z[7:4] = Z[7:4] + X1;
2'd1 : Z[7:4] = Z[7:4] + X;

endcase

Z = Z >>> 1;
Z[7] = Z[6];

P = Y[N];

end

end

endmodule
Testbench
Verilog
module booth_tb;

reg [3:0] X;
reg [3:0] Y;

wire [7:0] Z;

booth_multiplier uut (
.X(X),
.Y(Y),
.Z(Z)
);

initial begin

X = 4'b0100;
Y = 4'b0010;

#10 X = -4'b0101;
Y = 4'b1000;

end

endmodule



/////////////////////////////