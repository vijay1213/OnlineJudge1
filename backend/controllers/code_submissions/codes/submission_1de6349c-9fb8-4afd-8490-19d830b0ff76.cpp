#include <iostream>
#include <string>
using namespace std;

string reverseString(const string &s) {
    string reversed = s; // Create a copy of the original string
    int n = reversed.length();
    for (int i = 0; i < n / 2; ++i) {
        swap(reversed[i], reversed[n - i - 1]); // Swap the characters
    }
    return reversed;
}

int main() {
    string s;
    getline(cin, s); // Get the entire line of input including spaces
    cout << reversedString(s) << endl;
    return 0;
}
