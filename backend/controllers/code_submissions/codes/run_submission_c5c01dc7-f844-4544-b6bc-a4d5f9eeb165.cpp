#include <iostream>
#include <string>
using namespace std;

string reverseString(const string &s) {
    string reversed = s; // Create a copy of the original string
    int n = reversed.length();
    for (int i = 0; i < n / 2; ++i) {
        swap(reversed[i], reversed[n - i - 1]); // Swap the characte
    return reversed;
}

int main() {
    string s = "hello";
    cout << "Original: " << s << endl;
    cout << "Reversed: " << reverseString(s) << endl;
    return 0; 
    }
